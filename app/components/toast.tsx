export default function Toast({ message }: { message: string }) {
  return (
    <div className="toast toast-end toast-top">
      <div className="alert">
        <span>{message}.</span>
      </div>
    </div>
  );
}
