type DashboardWidgetProps = {
  title: string;
  count: number;
};

function DashboardWidget({
  title,
  count,
}: DashboardWidgetProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-bold">
        {title}
      </h3>

      <p className="text-3xl mt-2">
        {count}
      </p>
    </div>
  );
}

export default DashboardWidget;