/* eslint-disable max-len */
import App from '@App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SetWfName } from '@pages/Workflow/AddBlueprint';
import AddPrimaryCheckpoints from '@pages/Workflow/AddPrimaryCheckpoints';
import SetupCheckpoints from '@pages/Workflow/SetupCheckpoints';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import ConnectWallet from 'pages/ConnectWallet';
import ParticipantsDetail from 'pages/Workflow/Participants';
import Proposal from 'pages/Proposal';
import BasicInfo from '@pages/Proposal/components/BasicInfo';
import Duration from '@pages/Proposal/components/Duration';
import Enforcer from '@pages/Proposal/components/Enforcer';
import Participants from '@pages/Proposal/components/Participants';
import ReviewProposal from '@pages/Proposal/components/ReviewProposal';
import PageScreen from '@components/HomeScreen/PageScreen';
import ProposalDetail from 'pages/Voter';
import VotingMethod from '@pages/Proposal/components/VotingMethod';
import Polling from '@pages/Proposal/components/VotingMethod/Polling';
import ReviewModeProposal from '@pages/Proposal/components/ReviewProposalVoterView';
import ResultVote from '@pages/Voter/resultVote';
import BasicInfoForInitiatives from '@components/BasicInfoForInitiatives/BasicInfoForInitiatives';
import ReviewInitiatives from '@pages/MultiProposal/reviewInitiatives';
import BuildInitiative from '@pages/MultiProposal/BuildInitiative';
import BuildBlueprint from 'pages/Workflow/BuildBlueprint';
import ViewBluePrintTemplates from 'pages/Workflow/ViewBluePrintTemplates';
import ReviewCheckpointsTree from '@pages/MultiProposal/ReviewCheckpointsTree/ReviewCheckpointsTree';
import Initiative from 'pages/MultiProposal';
import ReviewCheckPoint from '@pages/MultiProposal/ReviewCheckPoint/ReviewCheckPoint';
import { AddNewInitiative } from '@pages/MultiProposal/AddNewInitiative/AddNewInitiative';
import ReviewCheckpointTree from '@pages/Workflow/ReviewCheckpointTree/ReviewCheckpointTree';
import SetUpInitiative from '@pages/MultiProposal/SetupInitiative';
import ReviewTemplate from '@pages/Workflow/ReviewTemplate/ReviewTemplate';
import VotingProposal from '@pages/Voter/components/votingProposal';
import MultiProposal from '@pages/Voter/components/votingProposal/MultiProposal';
import EditCheckpointsPage from '@pages/Workflow/EditBlueprintCheckpoint/editBlueprint';
// import Login from 'pages/Authentication';
import {
  OrganizationHome,
  OrganizationList,
  OrganizationSetting,
} from '@pages/Organization';
import CreatorLogin from '@pages/Authentication/creator';
import BluePrint from '@pages/Workflow/BluePrint';
import NewMission from '@pages/MultiProposal/Mission/NewMission';

const AppRoutes = () => (
  <BrowserRouter basename={PAGE_ROUTES.ROOT}>
    <Routes>
      <Route path={PAGE_ROUTES.ROOT} element={<App />}>
        <Route path={`${PAGE_ROUTES.ORG_DETAIL}/:orgIdString`} element={<OrganizationHome />} />
        <Route path={`${PAGE_ROUTES.ORG_DETAIL}/:orgIdString/setting`} element={<OrganizationSetting />} />
        <Route path={PAGE_ROUTES.CONNECT_WALLET} element={<ConnectWallet />} />
        <Route path={PAGE_ROUTES.LOGIN} element={<CreatorLogin />} />
        <Route path={PAGE_ROUTES.PROPOSAL_OR_BLUEPRINT} element={<PageScreen />} />
        <Route index element={<OrganizationList />} />

        <Route path={PAGE_ROUTES.PROPOSAL_DETAIL} element={<ProposalDetail />} />
        <Route path={`${PAGE_ROUTES.PROPOSAL_DETAIL}/:id`} element={<VotingProposal />} />
        <Route path={`${PAGE_ROUTES.MULTI_PROPOSAL}/:id`} element={<MultiProposal />} />
        {/* <Route path={PAGE_ROUTES.INITIATIVE_DETAIL} element={<ProposalDetail />} /> */}
        <Route path={PAGE_ROUTES.RESULT_VOTE} element={<ResultVote />} />

        <Route path={PAGE_ROUTES.INITIATIVE.ROOT} element={<Initiative />}>
          <Route path={`:orgIdString/${PAGE_ROUTES.INITIATIVE.CHOOSE_WORKFLOW}`} element={<BuildInitiative />} />
          <Route path={`:orgIdString/:workflowIdString/:versionIdString/${PAGE_ROUTES.INITIATIVE.MISSION}`} element={<NewMission />} />
          <Route path={`:orgIdString/${PAGE_ROUTES.INITIATIVE.MISSION}/:missionIdString`} element={<NewMission />} />
          <Route path={PAGE_ROUTES.INITIATIVE.REVIEW_CHECKPOINT} element={<ReviewCheckPoint />} />
          <Route path={PAGE_ROUTES.INITIATIVE.ADD_INITIATIVE} element={<AddNewInitiative />} />
          <Route
            path={PAGE_ROUTES.INITIATIVE.REVIEW_CHECKPOINTS_TREE}
            element={<ReviewCheckpointsTree />}
          />
          <Route
            path={`${PAGE_ROUTES.INITIATIVE.SET_UP_INITIATIVE}/:id`}
            element={<SetUpInitiative />}
          />
        </Route>

        {/* <Route path={PAGE_ROUTES.WORKFLOW.ROOT} element={<BluePrint />}> */}
        <Route path={PAGE_ROUTES.WORKFLOW.ROOT}>
          <Route path={`:orgIdString/${PAGE_ROUTES.WORKFLOW.EDIT}/:workflowId`} element={<BluePrint />} />
          <Route path={`${PAGE_ROUTES.WORKFLOW.SELECT_TEMPLATE}/:orgIdString`} element={<BuildBlueprint />} />
          <Route path={PAGE_ROUTES.WORKFLOW.SET_NAME} element={<SetWfName />} />
          <Route path={PAGE_ROUTES.WORKFLOW.ADD_PRIMARY_CP} element={<AddPrimaryCheckpoints />} />
          <Route path={PAGE_ROUTES.WORKFLOW.SETUP_CHECKPOINT} element={<SetupCheckpoints />} />
          <Route path={PAGE_ROUTES.WORKFLOW.PARTICIPANT_DETAIL} element={<ParticipantsDetail />} />
          <Route path={PAGE_ROUTES.WORKFLOW.REVIEW_CP_TREE} element={<ReviewCheckpointTree />} />

          <Route
            path={`:id/${PAGE_ROUTES.WORKFLOW.SETUP_CHECKPOINT}`}
            element={<EditCheckpointsPage />}
          />
          {/* <Route */}
          {/*  path={`:id/${PAGE_ROUTES.WORKFLOW.PARTICIPANT_DETAIL}`} */}
          {/*  element={<EditParticipantsDetail />} */}
          {/* /> */}
          {/* <Route */}
          {/*  path={`${PAGE_ROUTES.EDIT_BLUEPRINT.REVIEW_CHECKPOINT_TREE}/:id`} */}
          {/*  element={<PreviewEditCheckpointTree />} */}
          {/* /> */}
          {/* </Route> */}

          <Route path={PAGE_ROUTES.WORKFLOW.WF_TEMPLATES} element={<ViewBluePrintTemplates />} />
          <Route path={`${PAGE_ROUTES.WORKFLOW.WF_TEMPLATES}/:id`} element={<ReviewTemplate />} />
        </Route>

        <Route
          path={PAGE_ROUTES.BASIC_INFO_FOR_INITIATIVES}
          element={<BasicInfoForInitiatives />}
        />
        <Route path={PAGE_ROUTES.CREATE_PROPOSAL} element={<Proposal />}>
          <Route index element={<BasicInfo />} />
          <Route path={PAGE_ROUTES.ADD_BASIC_INFO} element={<BasicInfo />} />
          <Route path={PAGE_ROUTES.VOTING_METHOD} element={<VotingMethod />} />
          <Route path={PAGE_ROUTES.POLLING_METHOD} element={<Polling />} />
          <Route path={PAGE_ROUTES.ENFORCE} element={<Enforcer />} />
          <Route path={PAGE_ROUTES.DURATION} element={<Duration />} />
          <Route path={PAGE_ROUTES.PARTICIPANTS} element={<Participants />} />
          <Route path={PAGE_ROUTES.REVIEW_PROPOSAL} element={<ReviewProposal />} />
          <Route path={PAGE_ROUTES.REVIEW_MODE_PROPOSAL} element={<ReviewModeProposal />} />
        </Route>
        <Route path={PAGE_ROUTES.REVIEW_INITIATIVES} element={<ReviewInitiatives />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
