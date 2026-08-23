interface ConfirmDialogProps {
  title: string;
  message: string;
  busy: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmDialog({ title, message, busy, onCancel, onConfirm }: ConfirmDialogProps) {
  return (
    <div className="form-backdrop" role="presentation">
      <section className="confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title">
        <p className="eyebrow">Please confirm</p>
        <h2 id="confirm-title">{title}</h2>
        <p>{message}</p>
        <div className="form-actions">
          <button className="button button--ghost" disabled={busy} onClick={onCancel}>Cancel</button>
          <button className="button button--danger" disabled={busy} onClick={onConfirm}>{busy ? 'Deleting…' : 'Delete contact'}</button>
        </div>
      </section>
    </div>
  );
}
