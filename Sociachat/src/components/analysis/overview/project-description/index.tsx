interface Props {
  title?: string;
  description?: string;
}

const ProjectDescription = ({ title, description }: Props) => {
  return (
    <>
      <div className="self-stretch justify-start items-start inline-flex">
        <div className="grow shrink basis-0 flex-col justify-start items-start gap-3 inline-flex">
          <div className="justify-center items-center gap-5 inline-flex">
            <div className="text-[#2d2e33] text-[28px] font-bold leading-[34px]">
              {title}
            </div>
          </div>
          <div className="self-stretch text-[#7c7c7f] text-base font-normal leading-tight">
            {description}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDescription;
