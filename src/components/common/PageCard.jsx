import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const PageCard = ({
  title,
  description,
  icon: Icon,
  children,
  headerAction,
  className,
  contentClassName,
}) => {
  return (
    <Card
      className={cn("rounded-2xl border bg-background shadow-sm", className)}
    >
      {(title || description || headerAction || Icon) && (
        <CardHeader className="flex flex-row items-start justify-between space-y-0 border-b pb-4">
          <div className="flex items-start gap-3">
            {Icon && (
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
            )}

            <div>
              {title && (
                <CardTitle className="text-lg font-semibold">{title}</CardTitle>
              )}

              {description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
          </div>

          {headerAction && (
            <div className="flex items-center gap-2">{headerAction}</div>
          )}
        </CardHeader>
      )}

      <CardContent className={cn("p-6", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
};

export default PageCard;
