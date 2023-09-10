import { useAccount } from "wagmi";
import getAllProjects from "../utils/thegraph-queries/getAllProjects";
import getAllProjectsByOwner from "../utils/thegraph-queries/getAllProjectsByOwner";
import { useState, useEffect } from "react";
import { useContractWrite } from "wagmi";
import axios from "axios";
import HomeCTA from "@/components/HomeCTA";
import { VAULT_CONTRACT_ABI } from "../utils/constants";
import Layout from "@/components/layout";
import TableShimmer from "@/components/TableShimmer";

function AttestCollection({ collection, collectionIdx, allProjects }: any) {
  const [errorMessage, setErrorMessage] = useState("Already attested.");
  const { address } = useAccount();
  let vaultAddress = allProjects.find(
    (project: any) => project.id === collection.editionAddress
  )?.vault.id;

  const {
    write: attest,
    isSuccess,
    isError,
    isLoading,
    error,
  } = useContractWrite({
    address: vaultAddress,
    abi: VAULT_CONTRACT_ABI,
    functionName: "vote",
  });

  useEffect(() => {
    if (isError) {
      let errorMessage: any = error;
      errorMessage = errorMessage.message;
      console.log(error);
      if (errorMessage.includes("Vote_AlreadyVoted")) {
        setErrorMessage("Already voted.");
      } else if (errorMessage.includes("User denied")) {
        setErrorMessage("User denied tx.");
      } else {
        setErrorMessage("Unknown error.");
      }
    }
    (async () => {
      if (isSuccess) {
        localStorage.setItem("isSuccess", "true");
        let attestedCollectionsCache = JSON.parse(
          localStorage.getItem("attestedCollectionsCache") || "[]"
        );

        attestedCollectionsCache.push(collection.editionAddress);

        localStorage.setItem(
          "attestedCollectionsCache",
          JSON.stringify(attestedCollectionsCache)
        );

        console.log("Attested and cached!");
      }

      if (collection) {
        await axios
          .get(collection.imageURI)
          .then((res) => {
            if (res.data == null) {
              let temp = collection;
              temp.imageURI = "/nftree.jpg";
              collection = temp;
            }
          })
          .catch((err) => {
            console.log("err: ", err);
          });
      }
    })();
  }, []);

  return (
    <tr key={collectionIdx}>
      <td className="border-t border-gray-200 px-3 py-3.5 text-smtext-gray-500">
        <div className="font-medium text-gray-900">
          <a
            href={`collections/${collection.editionAddress}?isAttested=${isSuccess}`}
            className="group block flex-shrink-0"
          >
            <div className="flex items-center">
              <div>
                <picture>
                  <source
                    srcSet={
                      collection.imageURI !== "" ||
                      collection.imageURI !== null ||
                      collection.imageURI !== undefined
                        ? collection.imageURI
                        : "nftree.jpg"
                    }
                    type="image/*"
                  />
                  <img
                    className="inline-block h-9 w-9 rounded-full"
                    loading="lazy"
                    src={
                      collection.imageURI !== "" ||
                      collection.imageURI !== null ||
                      collection.imageURI !== undefined
                        ? collection.imageURI
                        : "nftree.jpg"
                    }
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "nftree.jpg";
                    }}
                    alt="image"
                  />
                </picture>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  NFTree
                </p>
                <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                  {collection.editionAddress}
                </p>
              </div>
            </div>
          </a>
        </div>
      </td>
      <td className="border-t border-gray-200 px-3 py-3.5 text-sm text-gray-500">
        {collection.tokenId}
      </td>

      <td className="border-t border-gray-200 px-3 py-3.5 text-smtext-gray-500">
        <button
          onClick={() => {
            console.log(collection);
            attest({
              args: [
                parseInt(collection.tokenId).toString(),
                "Very Good Collection!",
                true,
                address,
              ],
              to: address,
            });
          }}
          className={`disabled:opacity-50 inline-flex items-center rounded-md ${
            isError ? "bg-red-400" : isSuccess ? "bg-green-300" : "bg-slate-200"
          } px-5 py-1.5 text-sm hover:text-zinc-100  hover:bg-indigo-600 shadow-lg  font-semibold text-gray-900 ring-inset ring-gray-300`}
        >
          {isLoading
            ? "Attesting..."
            : isSuccess
            ? "Attested!"
            : isError
            ? errorMessage
            : "Attest"}
        </button>
      </td>
    </tr>
  );
}

export default function HomePage() {
  const { address } = useAccount();

  const [loadingProjects, setLoadingProjects] = useState(true);
  const [allProjects, setAllProjects] = useState([]);
  const [projectsByOwner, setProjectsByOwner] = useState([]);

  useEffect(() => {
    (async () => {
      const allProjects: any = await getAllProjects();
      setAllProjects(allProjects);

      let projectsByOwner: any = await getAllProjectsByOwner(address);
      let collectionsToAttestCache = JSON.parse(
        localStorage.getItem("collectionsToAttestCache") || "[]"
      );

      projectsByOwner = projectsByOwner.map((project: any) => {
        let collection = allProjects.find(
          (collection: any) => collection.id === project.editionAddress
        );

        return {
          ...project,
          imageURI: collection.imageURI,
        };
      });

      projectsByOwner = [...projectsByOwner, ...collectionsToAttestCache];
      setProjectsByOwner(projectsByOwner);
      setLoadingProjects(false);
    })();
  }, []);

  return (
    <Layout pageTitle="Home">
      <div className="mt-5 ">
        <HomeCTA />
      </div>

      <div className="mt-5  xl:mt-12">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold leading-6 text-gray-900">
              My Collections
            </h1>
          </div>
        </div>

        {!loadingProjects ? (
          <div className="-mx-4 mt-5 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
            <table className="min-w-full bg-white divide-y divide-gray-300 sm:rounded-lg">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Collections
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                  >
                    TokenId
                  </th>

                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {projectsByOwner.map((collection: any, collectionIdx) => (
                  <AttestCollection
                    allProjects={allProjects}
                    collection={collection}
                    collectionIdx={collectionIdx}
                    key={collectionIdx}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <TableShimmer />
        )}
      </div>
    </Layout>
  );
}
