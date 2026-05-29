import { ReusableTittle } from "@/components/ui/ReusableTittle";

const Page = () => {
  return (
    <main className="flex-1 space-y-8 p-6">
      <ReusableTittle
        firstTittle="misson"
        secondTittle="We’ve managed over 2.5 million candidates"
        text="Our mission is to connect talented professionals with companies that value their skills and potential. We believe in building meaningful career relationships that benefit both employers and candidates. With years of experience in recruitment, we pride ourselves on finding the perfect match for every role."
      />

      <section className="space-y-4 rounded-3xl border border-neutral-80/30 bg-brand-light-neutral p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-brand">Color test block</h2>
        <p className="text-brand">
          This paragraph uses the registered brand color:{" "}
          <strong>#4640DE</strong>.
        </p>
        <p className="text-neutral-60">
          This paragraph uses the registered neutral-60 color:{" "}
          <strong>#7C8493</strong>.
        </p>
        <p className="text-neutral-80">
          This paragraph uses the registered neutral-80 color:{" "}
          <strong>#515B6F</strong>.
        </p>
        <p className="text-neutral-100">
          This paragraph uses the registered neutral-100 color:{" "}
          <strong>#25324B</strong>.
        </p>
        <p className="text-accent-light-blue">
          This paragraph uses the registered accent light blue color:{" "}
          <strong>#26A4FF</strong>.
        </p>
        <p className="text-accent-yellow">
          This paragraph uses the registered accent yellow color:{" "}
          <strong>#FFB836</strong>.
        </p>
        <p className="text-accent-green">
          This paragraph uses the registered accent green color:{" "}
          <strong>#56CDAD</strong>.
        </p>
        <p className="text-accent-red">
          This paragraph uses the registered accent red color:{" "}
          <strong>#FF6550</strong>.
        </p>
        <p className="text-foreground-primary">
          This paragraph uses the registered foreground primary color:{" "}
          <strong>#202430</strong>.
        </p>
      </section>
    </main>
  );
};

export default Page;
