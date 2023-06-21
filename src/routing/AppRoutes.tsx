/* eslint-disable max-len */
import App from '@App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import PageScreen from '@components/HomeScreen/PageScreen';
import BuildInitiative from '@pages/Mission/ChooseWorkflow';
import ChooseTemplate from '@pages/Workflow/BuildBlueprint/ChooseTemplate';
import Mission from 'pages/Mission';
import {
  OrganizationHome,
  OrganizationList,
  OrganizationSetting,
} from '@pages/Organization';
import CreatorLogin from '@pages/Authentication/index';
import BluePrint from '@pages/Workflow/BluePrint';
import {
  EditVersion, NewVersion,
} from '@pages/Workflow/Version';
import NewMission from '@pages/Mission/NewMission';
import EditMission from '@pages/Mission/EditMission';

const AppRoutes = () => (
  <BrowserRouter basename={PAGE_ROUTES.ROOT}>
    <Routes>
      <Route path={PAGE_ROUTES.ROOT} element={<App isFullHeight />}>
        <Route path={PAGE_ROUTES.WORKFLOW.ROOT}>
          <Route path=":orgIdString/:workflowIdString/:versionIdString" element={<EditVersion />} />
        </Route>
      </Route>
      <Route path={PAGE_ROUTES.ROOT} element={<App />}>
        <Route path={`${PAGE_ROUTES.ORG_DETAIL}/:orgIdString`} element={<OrganizationHome />} />
        <Route path={`${PAGE_ROUTES.ORG_DETAIL}/:orgIdString/setting`} element={<OrganizationSetting />} />
        <Route path={PAGE_ROUTES.LOGIN} element={<CreatorLogin />} />
        <Route path={PAGE_ROUTES.PROPOSAL_OR_BLUEPRINT} element={<PageScreen />} />
        <Route index element={<OrganizationList />} />

        <Route path={PAGE_ROUTES.INITIATIVE.ROOT} element={<Mission />}>
          <Route path={`:orgIdString/${PAGE_ROUTES.INITIATIVE.CHOOSE_WORKFLOW}`} element={<BuildInitiative />} />
          <Route
            path={`:orgIdString/${PAGE_ROUTES.INITIATIVE.MISSION}/:missionIdString`}
            element={<EditMission />}
          />
          <Route
            path={`:orgIdString/:workflowIdString/:versionIdString/${PAGE_ROUTES.INITIATIVE.MISSION}`}
            element={<NewMission />}
          />
        </Route>

        <Route path={PAGE_ROUTES.WORKFLOW.ROOT}>
          <Route path={`:orgIdString/${PAGE_ROUTES.WORKFLOW.EDIT}/:workflowIdString`} element={<BluePrint />} />
          <Route path=":orgIdString/:workflowIdString/new" element={<NewVersion />} />
          <Route path={`${PAGE_ROUTES.WORKFLOW.SELECT_TEMPLATE}/:orgIdString`} element={<ChooseTemplate />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
