import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router";

const ModuleCard = ({ module }) => {
  const Icon = module.icon;

  return (
    <Link to={module.path} className="group block">
      <Card
        className={`
          relative
          overflow-hidden
          border
          ${module.border}
          border-t-[5px]
          bg-white/80
          backdrop-blur-md
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-1.5
          hover:shadow-xl
          hover:border-primary
        `}
      >
        <CardContent className="flex h-35 flex-col items-center justify-center gap-6 p-8">
          <div
            className={`
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              ${module.bg}
              transition-all
              duration-300
              group-hover:scale-110
            `}
          >
            <Icon size={38} className={`${module.color}`} strokeWidth={2} />
          </div>

          <div className="space-y-1 text-center">
            <h3 className="text-lg font-semibold tracking-tight text-slate-800">
              {module.title}
            </h3>

            <p className="text-sm text-slate-500 opacity-0 transition-all duration-300 group-hover:opacity-100">
              Open module
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ModuleCard;
