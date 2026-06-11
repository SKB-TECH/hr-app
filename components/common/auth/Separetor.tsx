export default function Separator({ text }: { text: string }) {
  return (
    <div className='CustomBorder my-4'>
      <div className='flex flex-col justify-center items-center'>
        <span className='z-10 bg-white w-fit font-light text-sm px-4 text-center text-gray-600 font-epilogue text-md'>
          {text}
        </span>
      </div>
    </div>
  );
}
