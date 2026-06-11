type EmptyStateProps = {
  message: string;
};

function EmptyState({
  message,
}: EmptyStateProps) {
  return (
    <div className="text-center p-6">
      <h2 className="text-xl text-gray-500">
        {message}
      </h2>
    </div>
  );
}

export default EmptyState;