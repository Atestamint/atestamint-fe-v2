import {
  CalendarDaysIcon,
  LockClosedIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export default function HomeCTA() {
  return (
    <div className="mt-6 shadow-lg relative isolate rounded-2xl overflow-hidden bg-indigo-600 py-16 sm:py-24 lg:py-16 lg:pt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              The Catalyst for Confidence
            </h2>
            <p className="mt-4 text-md leading-6 text-gray-300">
              Stand out from scammy NFT projects. Atestamint builds stronger
              communities & raises more funding.
            </p>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-3 lg:pt-2">
            <div className="flex flex-col items-center">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <CalendarDaysIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </div>
              <dt className="mt-4 text-sm font-semibold text-white">
                Create a project
              </dt>
              <dd className="mt-2 leading-7 text-gray-400"> </dd>
            </div>
            <div className="flex flex-col items-center">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <LockClosedIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </div>
              <dt className="mt-4 font-semibold  text-sm text-white">
                Lock funds
              </dt>
              <dd className="mt-2 leading-7 text-gray-400"></dd>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <CheckCircleIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </div>
              <dt className="mt-4  text-sm font-semibold text-white">
                Get attestations to unlock
              </dt>
              <dd className="mt-2 leading-7 text-gray-400"></dd>
            </div>
          </dl>
        </div>
      </div>
      <div
        className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
        aria-hidden="true"
      >
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
}
