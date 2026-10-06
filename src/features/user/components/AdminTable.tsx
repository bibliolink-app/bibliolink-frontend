import { useMemo } from 'react'
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { LoaderCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../../components/ui/alert-dialog'
import { useSession } from '../../auth/hooks/useSession'
import { useDisableUser, useEnableUser } from '../Hook/UserHook'
import type { UsuarioListado } from '../Models/UserModels'

const columnHelper = createColumnHelper<UsuarioListado>()

function StatusBadge({ active }: { active: boolean }) {
  const { t } = useTranslation()

  return (
    <span
      className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${
        active ? 'bg-emerald-100 text-emerald-900 ring-emerald-700/40' : 'bg-stone-100 text-stone-600 ring-stone-500/40'
      }`}
    >
      {active ? t('admin:table.status.active') : t('admin:table.status.inactive')}
    </span>
  )
}

export function AdminsTable({ users }: { users: UsuarioListado[] }) {
  const { t, i18n } = useTranslation()
  const { user: currentUser } = useSession()
  const enableUser = useEnableUser()
  const disableUser = useDisableUser()

  const pendingUserId = enableUser.variables ?? disableUser.variables
  const isMutating = enableUser.isPending || disableUser.isPending

  const columns = useMemo(
    () => [
      columnHelper.accessor('username', { header: t('admin:table.headers.username') }),

      columnHelper.accessor(
        (row) => [row.firstName, row.middleName, row.firstSurname, row.secondSurname].filter(Boolean).join(' '),
        { id: 'fullName', header: t('admin:table.headers.fullName') },
      ),

      columnHelper.accessor('email', { header: t('admin:table.headers.email') }),

      columnHelper.accessor('status', {
        header: t('admin:table.headers.status'),
        cell: (info) => <StatusBadge active={info.getValue() === 'ACTIVE'} />,
      }),

      columnHelper.accessor('createdAt', {
        header: t('admin:table.headers.createdAt'),
        // Llega como ISO string: se convierte solo para mostrarlo.
        cell: (info) => new Date(info.getValue()).toLocaleDateString(i18n.language),
      }),

      columnHelper.display({
        id: 'actions',
        header: t('admin:table.headers.actions'),
        cell: ({ row }) => {
          const target = row.original
          const isActive = target.status === 'ACTIVE'
          // El backend impide que un administrador se desactive a sí mismo.
          const isSelf = target.userId === currentUser?.userId
          const isThisRowPending = isMutating && pendingUserId === target.userId
          const buttonClassName =
            'inline-flex items-center gap-1.5 rounded-md border border-stone-500 px-3 py-1.5 text-sm font-semibold text-stone-900 enabled:cursor-pointer enabled:hover:border-rose-900 enabled:hover:bg-rose-900 enabled:hover:text-stone-100 disabled:cursor-not-allowed disabled:opacity-50 motion-safe:transition-colors'

          if (!isActive) {
            return (
              <button
                type="button"
                disabled={isMutating}
                aria-busy={isThisRowPending}
                onClick={() => enableUser.mutate(target.userId)}
                className={buttonClassName}
              >
                {isThisRowPending && <LoaderCircle className="size-4 motion-safe:animate-spin" />}
                {t('admin:table.actions.enable')}
              </button>
            )
          }

          return (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  type="button"
                  disabled={isSelf || isMutating}
                  aria-busy={isThisRowPending}
                  title={isSelf ? t('admin:table.actions.selfDisableTitle') : undefined}
                  className={buttonClassName}
                >
                  {isThisRowPending && <LoaderCircle className="size-4 motion-safe:animate-spin" />}
                  {t('admin:table.actions.disable')}
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t('admin:table.confirmDisable.title', { username: target.username })}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t('admin:table.confirmDisable.description')}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t('admin:table.confirmDisable.cancel')}</AlertDialogCancel>
                  <AlertDialogAction variant="destructive" onClick={() => disableUser.mutate(target.userId)}>
                    {t('admin:table.confirmDisable.confirm')}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )
        },
      }),
    ],
    [currentUser?.userId, disableUser, enableUser, isMutating, pendingUserId, t],
  )

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="overflow-x-auto rounded-lg bg-stone-300 shadow-xl ring-1 ring-black/25">
      <table className="w-full min-w-3xl text-left text-stone-900">
        <thead className="border-b border-stone-500/40">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} scope="col" className="px-4 py-3 text-sm font-semibold tracking-wide">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b border-stone-500/20 last:border-0">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}