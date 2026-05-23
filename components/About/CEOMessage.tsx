import Image from "next/image";

export default function CEOMessage() {
  return (
    <section className="w-full bg-white py-16 ">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
        {/* freddy: remove px-12 and keep max-w-7xl for better alignment */}
        <div className="flex-1 min-w-0">
          <p className="text-lg font-semibold tracking-widest uppercase text-brand mb-4">
            Message from CEO
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0d2b4e] leading-tight mb-8">
            We are here to <br className="hidden sm:block" />
            support your career.
          </h2>

          <p className="text-gray-500 text-base leading-relaxed mb-5">
            Lorem ipsum dolor sit amet consectetur. Tellus euismod commodo
            ridiculus at pretium egestas ullamcorper ornare. At sit ut nec nunc
            accumsan risus vestibulum nisi. Vitae faucibus facilisis sit quis
            egestas. Magna consectetur sit sagittis auctor sed massa vulputate.
            Lobortis mollis sed viverra in integer dictumst. Fringilla massa id
            integer.
          </p>
          <p className="text-gray-500 text-base leading-relaxed">
            Feugiat suspendisse nulla risus lectus. Suscipit et gravida vehicula
            ut orci gravida volutpat ut. Amet sit est tincidunt sed luctus diam.
            Viverra massa neque dictum a. Bibendum quis eget mi vitae. Proin
            dolor felis viverra sed est nisl dictum. Massa sed mi a tincidunt.
            Morbi vestibulum nam elementum commodo posuere mattis vitae. Et
            vestibulum quam tincidunt.
          </p>
        </div>

        <div className="flex flex-col items-center lg:items-end flex-shrink-0 ">
          <div className="relative w-64 h-80 md:w-72 md:h-96  overflow-hidden">
            <Image
              src="/ceoImg.png"
              alt="Laila Britney, CEO of Recruit"
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          <div className="mt-4 text-right">
            <p className="text-[#0d2b4e] font-semibold text-base">
              Laila Britney
            </p>
            <p className="text-gray-400 text-xs tracking-widest uppercase mt-0.5">
              CEO of Recruit
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
