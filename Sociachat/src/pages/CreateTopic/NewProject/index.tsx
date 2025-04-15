import CreateProjectForm from '@/components/create-project-form';
import Stepper from '@/components/dashboard/Stepper';

const NewProject = () => {
    return (
      <>
        <section className="w-[688px] h-[58px] flex flex-col justify-start items-start gap-1">
          <h2>Create Project</h2>
          <p className="text-zinc-500 leading-tight"> Project that discusses certain projects to suppress various things that are currently trending </p>
        </section>
        <Stepper />
        <section className="w-[1169px] min-h-screen px-8 py-6 bg-white rounded-lg shadow border border-gray-200 flex flex-col justify-start items-start gap-6 mb-10">
          <div className="self-stretch  flex-col justify-start items-start gap-8 flex">
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 flex">
                <div className="self-stretch justify-start items-start gap-[197px] flex">
                  <div className="justify-start items-center gap-2 flex">
                    <h3 className="leading-loose">Project Description</h3>
                  </div>
                </div>
                  <p className="self-stretch text-neutral-400 leading-tight">Created main  information of project</p>
              </div>	
						<CreateProjectForm />
					</div>
        </section>
      </>
    );
}

export default NewProject