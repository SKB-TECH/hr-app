import StatusLabel from "@/components/jobDetails/StatusLabel";

import { getStyleForCategory } from "@/lib/utils";

type Label = {
  id: string | number;
  name: string;
};

type Props = {
  labels: Label[];
  className?: string;
};

export default function JobCategories({ labels, className = "" }: Props) {
  const styles = getStyleForCategory(labels);

  return (
    <div className={`py-8 ${className}`}>
      <h1 className="pb-4 text-[24px] md:text-[32px] text-neutral-100 font-bold font-clash">
        Categories
      </h1>
      <div className="flex items-center gap-4 flex-wrap">
        {labels.map((label, index) => {
          return (
            <StatusLabel
              key={label.name}
              className="rounded-full font-medium"
              label={label.name}
              style={{
                backgroundColor: styles[index]?.bg,
                color: styles[index]?.text,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
