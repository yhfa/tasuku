import { useContext } from "react";
import { Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/react";

import SideMenuProjectItem from "./SideMenuProjectItem";
import { ProjectContext } from "src/services/ProjectContext";
import { Project as ProjectType } from "src/models/GlobalModules";

const SideMenuProjectList = () => {
  /* ********************destructure from the context******************** */
  const { getProjectsResponse } = useContext(ProjectContext);

  return (
    <div style={{ maxHeight: "55vh", overflowY: "auto" }}>
      {/***********displaying projects***********/}
      {getProjectsResponse.isError && <p>Error fetching data</p>}
      {getProjectsResponse.isLoading || getProjectsResponse.isRefetching ? (
        <Stack mt="30px">
          <Skeleton height="15px" width="80%" />
          <Skeleton height="15px" width="80%" />
          <Skeleton height="15px" width="80%" />
        </Stack>
      ) : (
        getProjectsResponse.isSuccess && (
          <>
            {getProjectsResponse?.data?.data?.boards?.map(
              (project: ProjectType) => (
                <SideMenuProjectItem project={project} key={project._id} />
              )
            )}
          </>
        )
      )}
    </div>
  );
};
export default SideMenuProjectList;
