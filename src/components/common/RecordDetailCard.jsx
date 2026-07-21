import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import StatusBadge from "@/components/common/StatusBadge";
const RecordDetailCard = ({ title, subtitle, status, fields = [] }) => {
  return (
    <Card className="rounded-xl shadow-sm mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          {status !== undefined && <StatusBadge status={status} />}
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        {fields.map((f) => (
          <div key={f.label}>
            <p className="text-muted-foreground">{f.label}</p>
            <p className="font-medium">{f.value ?? "-"}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecordDetailCard;
