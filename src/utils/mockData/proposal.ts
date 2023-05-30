import { ECheckpointsType } from 'types/enums/checkpoints';
import { CP_NAME } from '@constants/checkpoint';
import { VotingValidateInterface } from 'types/proposal';

export interface DataTimeLine {
  id: number;
  title: string;
  value: string;
}

export interface DataUserVote {
  id: number;
  urlAvatar: string;
  token: string;
  money: string;
}

export interface Proposal {
  id: number;
  decisionTitle: string;
  description: string;
  startTime: string;
  endTime: string;
  threshold: number;
  isMulti: boolean;
  multiProposalId?: number | string;
  order?: number | undefined | string;
  isShowVotes: boolean;
}

export const proposals: Proposal[] = [
  {
    id: 1,
    decisionTitle: '[TMP #7] - Community Proposal: Metavault',
    description:
      '<p style=" color: #252422"> <strong>Scope:</strong></p> <br> <p style="color: #575655">Request DAO approval to deploy funds into Metavault via MVLP on Polygon.</p> <br><br> <p style=" color: #252422"><strong>Current Governance Limitations:</strong></p><br> <p style=" font-weight:500; color:#575655 ">Per WIP #27</p> <br> <p style="padding-left: 10px; padding-bottom: 5px; border-left: 5px solid #E3E3E2;">Any seemingly valid strategy has to be properly vetted by the Risk Officer, voted by &nbsp;the treasury council and go through the proper governance process when applicable.</p> <br> <p>While the proposed investment can be voted by the Treasury Council, the above guidelines cannot be followed as expected due to the current lack of Risk Officer, a TMP is being used to assist treasury personnel with decision making by having the DAO review the proposal, assess the risks and make the final decision.</p> <br><br> <p style=" color: #252422"><strong>🎯Objective:</strong></p> <br> <ul style="list-style-type: disc; padding-left: 25px"> <li>Deploy $2mm USDC into MVLP in Metavault on the Polygon chain.</li> <br> <li>Purchase and stake $25k of MVX.</li> </ul> <br><br> <p style=" color: #252422"><strong>Rationale & Metavault Background:</strong></p> <br> <p><img src="/assets/images/image-proposal.png"></p> <br> <p style="">The InvestDAO Treasury still has a lot of unallocated stables and given the current market conditions there are limited directional opportunities.</p> <br> <p style="">Metavault is a GMX fork on Polygon. Their MVLP token is akin to GMX’s GLP token that has proven very popular. GLP holds significantly more stables than MVLP so we will be able to mint MVLP at an attractive rate by supplying stables to balance the pool of tokens.</p> <br> <p style="">Metavault is a GMX fork on Polygon. Their MVLP token is akin to GMX’s GLP token that has proven very popular. GLP holds significantly more stables than MVLP so we will be able to mint MVLP at an attractive rate by supplying stables to balance the pool of tokens.</p> <br> <p style="background-color: #FBF4EA; padding: 24px 16px; font-size: 20px" >Expected returns are ~25-35% annually. Around 30% of this is paid in Matic (Polygon’s token) and 70% in esMVX (akin to esGMX on GMX).</p> <br> <p style="">MVLP consists of 35% stables (target weight on stables is 45%), with the rest being directional tokens, primarily BTC, ETH and Matic. This compared to GLP at 49% stables means we will have a bit more upside (and downside) potential as the market evolves.</p> <br> <p style="">MVX has a MC of just over $8mm. This means a lot of potential for growth. Polygon has over $1bn TVL, slightly more than Arbitrum where GMX is primarily housed.</p> <br> <p style="">GMX has first mover advantage but there is a large amount of capital on Polygon to serve.</p> <br> <p style="">The Treasury team suggests buying $25k worth of spot tokens to stake due to the high growth potential in this project. Our deposit into the ecosystem will boost their AUM by 25% and growth should follow as it is correlated with available liquidity.</p> <br> <p style="">Staked MVX tokens currently receive an additional 36% APR with 6.7% coming in Matic rewards with the remainder in esMVX.</p> <br> <p style="">The Treasury Operators will monitor the positions to maximize profitability and manage risk.</p> <br> <p>Metavault site: <a style="text-decoration: none; color: #5D23BB" href="https://app.metavault.trade/#/dashboard">https://app.metavault.trade/#/dashboard</a></p> <br> <br> <br> <p style=" color: #252422"> <strong>Risks:</strong> </p> <br> <p style=" color: #252422"> <strong>Smart Contract Risk:</strong> </p> <p> <br> </p> <p style="color: #575655;">Smart contract risk will always be present. This is a fork of GMX which has been through audits. MVX has had their own audit. Link to the audit and docs below.</p> <br> <p>&nbsp;</p> <br> <p style=" color: #252422"> <strong>Price Risk:</strong> </p> <p>This is a relatively low risk position. If the market continues to move down we will experience some losses, though not nearly as much as if we were holding spot ETH and BTC. Generated yields will help reduce this.</p> <br> <p>Metavault may experience attacks similar to GMX, though substantially less likely. This is done through highly leveraged positions along with market manipulation attempts. Metavault has only $10mm AUM with WL adding (assets under management) so an attack of this type is improbable.</p> <br>',
    startTime: 'Apr 01 2023  12:00:30 AM GMT+0700',
    endTime: 'Apr 03 2023 11:59:20 PM GMT+0700',
    threshold: 10,
    isMulti: false,
    isShowVotes: false,
  },
  {
    id: 2,
    decisionTitle: 'Upvote',
    description:
      '<p> <strong style="color: #252422">Vote for the next feature to be released in Q2-2023</strong> </p> <br/> <p>We value the contribution of Axie community and want to ensure that we always develop our products based on your actual wishlist.</p> <br/> <div style="background-color: #FBF4EA; padding: 24px 16px 24px 16px"><p>This is a list of Top 30 features summitted by community members and received the most likes on our Discord server in the last month. Thanks for playing a critical role in our growth, as always!!</p> </div> <br/> <img src="/assets/images/IC%20review/image%204.png"/> <br/> <p > <strong style="color: #252422">1. Upvoting principles:</strong> </p> <br/> <ul style="padding-left: 20px"> <li style="list-style-type: disc;">Legit participants are those who hold at least 1 $AXS for a minimum period of 1 month</li> <li style="list-style-type: disc;">Each participant can upvote for multiple options</li> <li style="list-style-type: disc;">Passed projects to go to the next round are all options that pass the threshold</li> </ul> <br/> <p> <strong style="color: #252422">2. What\'s next:</strong> <br/> <br/> </p> <ul style="padding-left: 20px"> <li style="list-style-type: disc;">Top 10 selected features will then be shortlisted to Top 3 by Axie PM (Product Managers) team</li> <li style="list-style-type: disc;">Top 3 shortlisted features will then be decided to final selection by $AXS holders</li> </ul> <br/> <p>VOTE NOW GUYS!!</p>',
    startTime: 'Mar 01 2023 12:00 AM GMT+0700',
    endTime: 'Mar 07 2023 11:59 PM GMT+0700',
    threshold: 100,
    isMulti: true,
    multiProposalId: 1,
    order: 1,
    isShowVotes: true,
  },
  {
    id: 3,
    decisionTitle: 'Short-list',
    description:
      '<p> <strong style="color: #252422">Shortlist top 3 features</strong> </p> <br/> <p> <span style="color: #252422">Hey guys, community has choosen The Top 10 features in their wishlist.</span> </p> <br/> <div style="background-color: #FBF4EA; padding: 24px 16px 24px 16px"> <p > <span style="color: #252422"; >Now our job is to shortlist the Top 3 features, based on below criteria:</span> </p> <ul style="padding-left: 20px"> <li style="list-style-type: disc;">Product vision</li> <li style="list-style-type: disc;">Market competitiveness</li> <li style="list-style-type: disc;">Technical feasibility<i> </ul> </div><br/> <img src="/assets/images/image%204.png" /> <br/> <p> <span style="color: #252422">The scorecard will be sent to you via email. Please score &amp; rank Top 3 of your own based on the score card then select 3 options here.</span> </p> <br/> <p>Contact @takashi if you have questions.</p> <br/> <p>Thanks.</p>',
    startTime: 'Mar 01 2023 12:00:30 AM GMT+0700',
    endTime: 'Mar 07 2023 11:59:20 PM GMT+0700',
    threshold: 75,
    isMulti: true,
    multiProposalId: 1,
    order: 2,
    isShowVotes: true,
  },
  {
    id: 4,
    decisionTitle: 'Polling vote',
    description:
      '<p> <strong style="color: #252422; ">It’s coming close... Which feature will finally be chosen for Q2?</strong> </p><br/> <p>We greatly value the input and feedback of our community in shaping the development of our product. The list of Top 10 features upvoted by the community has been reviewed and shortlisted by our PM team.</p> <br/><p style="padding-left: 8px; border-left: 5px solid #E3E3E2;">Our PM team has used a variety of factors to make this decision, including community voting data, market research, and our long-term product vision for Axie. We want to assure our community that their voices have been heard and we are committed to building the best product possible that meets the needs and wants of our users. - Annie (Product Manager)</p> <p> <br> </p> <img src="/assets/images/image%205.png"> <br> <p> <strong style="color: #252422; font-size: 28px">1. Upvoting principles:</strong> </p> <p> <br> </p> <ul style="padding-left: 20px"> <li style="list-style-type: disc;">Legit participants are those who hold at least 100 $AXS for a minimum period of 3 months</li> <li style="list-style-type: disc;">Each participant can vote for up to 2 options</li> <li style="list-style-type: disc;">Passed feature is Top 1 option ranked by total voting power shown up and passed 30% threshold</li> </ul> <br> <p> <strong style="color: #252422">2. What\'s next:</strong> </p> <p> <br> </p> <ul style="padding-left: 20px"> <li style="list-style-type: disc;">Final selected option will be moved to the Product Roadmap and we can expect the feature release in Q2-2023</li> <li style="list-style-type: disc;">All unchoosen features will be moved to the Product Backlog and will be reviewed again if it passed in the Discord preliminary voting round next time.</li> </ul> <p> <br> </p> <p>READY TO CAST YOUR FINAL VOTE NOW</p>',
    startTime: 'Mar 01 2023 12:00:20 AM GMT+0700',
    endTime: 'Mar 07 2023 11:59:20 PM GMT+0700',

    threshold: 30,
    isMulti: true,
    multiProposalId: 1,
    order: 3,
    isShowVotes: true,
  },
];

export interface MultiProposalMockData {
  id: number;
  title: string;
  totalCheckpoint: number;
  currentStep?: number;
}

export const multiProposalMockData: MultiProposalMockData[] = [
  {
    id: 1,
    title: 'Axie Infinity Q2-2023 New Feature Release',
    totalCheckpoint: 3,
    currentStep: 3,
  },
];

export interface Options {
  id: number;
  proposalId: number;
  value: string;
  isChoice?: boolean;
  isLoop?: boolean;
}

export const options: Options[] = [
  {
    id: 1,
    proposalId: 1,
    value: 'Deny Deployment',
    isLoop: true,
  },
  {
    id: 2,
    proposalId: 1,
    value: 'Approve Deployment',
    isLoop: true,
  },
  {
    id: 3,
    proposalId: 2,
    value: 'Better game rewards',
    isLoop: true,
  },
  {
    id: 4,
    proposalId: 2,
    value: 'More game modes',
    isLoop: true,
  },
  {
    id: 5,
    proposalId: 2,
    value: 'In-game marketplace for items',
    isLoop: true,
  },
  {
    id: 6,
    proposalId: 2,
    value: 'Customizable avatars',
    isLoop: true,
  },
  {
    id: 7,
    proposalId: 2,
    value: 'More social features',
    isLoop: true,
  },
  {
    id: 8,
    proposalId: 2,
    value: 'Virtual land ownership',
    isLoop: true,
  },
  {
    id: 9,
    proposalId: 2,
    value: 'Integration with other Web3 platforms',
    isLoop: true,
  },
  {
    id: 10,
    proposalId: 2,
    value: 'Support for non-fungible tokens (NFTs)',
    isLoop: true,
  },
  {
    id: 11,
    proposalId: 2,
    value: 'More engaging storylines',
    isLoop: true,
  },
  {
    id: 12,
    proposalId: 2,
    value: 'Better user interface for gameplay',
    isLoop: true,
  },
  {
    id: 13,
    proposalId: 2,
    value: 'Partnership with popular gaming streamers',
    isLoop: true,
  },
  {
    id: 14,
    proposalId: 2,
    value: 'More game tournaments',
    isLoop: true,
  },
  {
    id: 15,
    proposalId: 2,
    value: 'Ability to earn real-world rewards',
    isLoop: true,
  },
  {
    id: 16,
    proposalId: 2,
    value: 'Customizable in-game quests',
    isLoop: true,
  },
  {
    id: 17,
    proposalId: 2,
    value: 'NFT-enabled game assets with unique characteristics.',
    isLoop: true,
  },
  {
    id: 18,
    proposalId: 2,
    value: 'Partnership with game developers for exclusive content',
    isLoop: true,
  },
  {
    id: 19,
    proposalId: 2,
    value: 'More in-game events',
    isLoop: true,
  },
  {
    id: 20,
    proposalId: 2,
    value: 'Ability to earn real-world rewards',
    isLoop: true,
  },
  {
    id: 21,
    proposalId: 3,
    value: 'Better game rewards system',
    isLoop: true,
  },
  {
    id: 22,
    proposalId: 3,
    value: 'More game modes',
    isLoop: true,
  },
  {
    id: 23,
    proposalId: 3,
    value: 'In-game marketplace for items',
    isLoop: true,
  },
  {
    id: 24,
    proposalId: 3,
    value: 'Customizable avatars',
    isLoop: true,
  },
  {
    id: 25,
    proposalId: 3,
    value: 'More social features',
    isLoop: true,
  },
  {
    id: 26,
    proposalId: 3,
    value: 'Virtual land ownership',
    isLoop: true,
  },
  {
    id: 27,
    proposalId: 3,
    value: 'Integration with other Web3 platforms',
    isLoop: true,
  },
  {
    id: 28,
    proposalId: 3,
    value: 'Integration with NFTs',
    isLoop: true,
  },
  {
    id: 29,
    proposalId: 3,
    value: 'Better user interface for gameplay',
    isLoop: true,
  },
  {
    id: 30,
    proposalId: 3,
    value: 'Support for non-fungible tokens (NFTs)',
    isLoop: true,
  },
  {
    id: 31,
    proposalId: 4,
    value: 'Better game rewards system',
    isLoop: true,
  },
  {
    id: 32,
    proposalId: 4,
    value: 'More game modes',
    isLoop: true,
  },
  {
    id: 33,
    proposalId: 4,
    value: 'In-game marketplace for items',
    isLoop: true,
  },
];

export interface VotingResult {
  proposalId: number;
  optionedId: number;
  urlAvatar: string;
  token: string;
  vote: string;
}

export const votingResult: VotingResult[] = [
  {
    proposalId: 1,
    optionedId: 1,
    urlAvatar: '/assets/images/temp/avatar-vote-1.png',
    token: '1KkbecGHvrzvMWkFkMaJBqoBYKPpT2Bpbz',
    vote: '1 Vote',
  },
  {
    proposalId: 1,
    optionedId: 1,
    urlAvatar: '/assets/images/temp/avatar-vote-2.png',
    token: '1LNWgJ6f5bB3JkQLDU6b6MpsEQ14PFfqH2',
    vote: '1 Vote',
  },
  {
    proposalId: 1,
    optionedId: 1,
    urlAvatar: '/assets/images/temp/avatar-vote-3.png',
    token: '1Bw59rRj4ZroQJ9QaWqGhxygZCjZeka6E4',
    vote: '1 Vote',
  },
  {
    proposalId: 1,
    optionedId: 1,
    urlAvatar: '/assets/images/temp/avatar-vote-4.png',
    token: '1MrDxg1scc8hsFuym9e6pxeAxeFViWk4J',
    vote: '1 Vote',
  },
  {
    proposalId: 1,
    optionedId: 1,
    urlAvatar: '/assets/images/temp/avatar-vote-5.png',
    token: '1ghjecGHvrzvMWkFkMaJBqoBYKPpT2Bpbz',
    vote: '1 Vote',
  },
  {
    proposalId: 1,
    optionedId: 2,
    urlAvatar: '/assets/images/temp/avatar-vote-5.png',
    token: '14njxLcSeg1FEQUv8HmB9FipxgCenUTtVb',
    vote: '1 Vote',
  },
  {
    proposalId: 1,
    optionedId: 2,
    urlAvatar: '/assets/images/temp/avatar-vote-3.png',
    token: '14gXyvc1WhwbXqy63h2dmrRUxHjvA7VL9b',
    vote: '1 Vote',
  },
  {
    proposalId: 1,
    optionedId: 2,
    urlAvatar: '/assets/images/temp/avatar-vote-1.png',
    token: '1BJmFUzEvGUSheM4P48LBm1ZB2puqqNHL',
    vote: '1 Vote',
  },
  {
    proposalId: 1,
    optionedId: 2,
    urlAvatar: '/assets/images/temp/avatar-vote-4.png',
    token: '17Ss3NTj6q9u3MM1dhwyF8LpU3t635VR1P',
    vote: '1 Vote',
  },
  {
    proposalId: 2,
    optionedId: 3,
    urlAvatar: '/assets/images/temp/avatar-vote-3.png',
    token: '14gXyvc1WhwbXqy63h2dmrRUxHjvA7VL9b',
    vote: '1 Vote',
  },
  {
    proposalId: 2,
    optionedId: 3,
    urlAvatar: '/assets/images/temp/avatar-vote-1.png',
    token: '1BJmFUzEvGUSheM4P48LBm1ZB2puqqNHL',
    vote: '1 Vote',
  },
  {
    proposalId: 2,
    optionedId: 4,
    urlAvatar: '/assets/images/temp/avatar-vote-4.png',
    token: '17Ss3NTj6q9u3MM1dhwyF8LpU3t635VR1P',
    vote: '1 Vote',
  },
  {
    proposalId: 2,
    optionedId: 4,
    urlAvatar: '/assets/images/temp/avatar-vote-3.png',
    token: '14gXyvc1WhwbXqy63h2dmrRUxHjvA7VL9b',
    vote: '1 Vote',
  },
  {
    proposalId: 2,
    optionedId: 5,
    urlAvatar: '/assets/images/temp/avatar-vote-1.png',
    token: '1BJmFUzEvGUSheM4P48LBm1ZB2puqqNHL',
    vote: '1 Vote',
  },
  {
    proposalId: 2,
    optionedId: 5,
    urlAvatar: '/assets/images/temp/avatar-vote-4.png',
    token: '17Ss3NTj6q9u3MM1dhwyF8LpU3t635VR1P',
    vote: '1 Vote',
  },
  {
    proposalId: 3,
    optionedId: 21,
    urlAvatar: '/assets/images/temp/avatar-vote-1.png',
    token: '1BJmFUzEvGUSheM4P48LBm1ZB2puqqNHL',
    vote: '1 Vote',
  },
  {
    proposalId: 3,
    optionedId: 21,
    urlAvatar: '/assets/images/temp/avatar-vote-4.png',
    token: '17Ss3NTj6q9u3MM1dhwyF8LpU3t635VR1P',
    vote: '1 Vote',
  },
  {
    proposalId: 3,
    optionedId: 22,
    urlAvatar: '/assets/images/temp/avatar-vote-1.png',
    token: '1BJmFUzEvGUSheM4P48LBm1ZB2puqqNHL',
    vote: '1 Vote',
  },
  {
    proposalId: 3,
    optionedId: 22,
    urlAvatar: '/assets/images/temp/avatar-vote-4.png',
    token: '17Ss3NTj6q9u3MM1dhwyF8LpU3t635VR1P',
    vote: '1 Vote',
  },
  {
    proposalId: 3,
    optionedId: 23,
    urlAvatar: '/assets/images/temp/avatar-vote-1.png',
    token: '1BJmFUzEvGUSheM4P48LBm1ZB2puqqNHL',
    vote: '1 Vote',
  },
  {
    proposalId: 3,
    optionedId: 23,
    urlAvatar: '/assets/images/temp/avatar-vote-4.png',
    token: '17Ss3NTj6q9u3MM1dhwyF8LpU3t635VR1P',
    vote: '1 Vote',
  },
  {
    proposalId: 4,
    optionedId: 31,
    urlAvatar: '/assets/images/temp/avatar-vote-1.png',
    token: '1BJmFUzEvGUSheM4P48LBm1ZB2puqqNHL',
    vote: '1 Vote',
  },
  {
    proposalId: 4,
    optionedId: 31,
    urlAvatar: '/assets/images/temp/avatar-vote-4.png',
    token: '17Ss3NTj6q9u3MM1dhwyF8LpU3t635VR1P',
    vote: '1 Vote',
  },
  {
    proposalId: 4,
    optionedId: 32,
    urlAvatar: '/assets/images/temp/avatar-vote-1.png',
    token: '1BJmFUzEvGUSheM4P48LBm1ZB2puqqNHL',
    vote: '1 Vote',
  },
  {
    proposalId: 4,
    optionedId: 32,
    urlAvatar: '/assets/images/temp/avatar-vote-4.png',
    token: '17Ss3NTj6q9u3MM1dhwyF8LpU3t635VR1P',
    vote: '1 Vote',
  },
  {
    proposalId: 4,
    optionedId: 33,
    urlAvatar: '/assets/images/temp/avatar-vote-1.png',
    token: '1BJmFUzEvGUSheM4P48LBm1ZB2puqqNHL',
    vote: '1 Vote',
  },
  {
    proposalId: 4,
    optionedId: 33,
    urlAvatar: '/assets/images/temp/avatar-vote-4.png',
    token: '17Ss3NTj6q9u3MM1dhwyF8LpU3t635VR1P',
    vote: '1 Vote',
  },
];

export interface CheckpointList {
  id: string;
  parentId: string | null | number;
  proposalId?: number;
  level: number;
  isParent?: boolean;
  haveRouteDetail: boolean;
  iconColor: string;
  name: string;
  type: ECheckpointsType;
  isFirstOfLeaf: boolean;
  isLastOfLeaf: boolean;
  memberType?: string;
}

export const checkpointsList: CheckpointList[] = [
  {
    id: '1',
    parentId: null,
    proposalId: 1,
    level: 1,
    isParent: false,
    haveRouteDetail: false,
    iconColor: '#252422',
    name: 'Upvote',
    type: ECheckpointsType.upvote,
    isFirstOfLeaf: true,
    isLastOfLeaf: false,
    memberType: 'Members',
  },
  {
    id: '2',
    parentId: 'cp1',
    proposalId: 2,
    level: 1,
    isParent: false,
    haveRouteDetail: false,
    iconColor: '#252422',
    name: 'Short-list',
    type: ECheckpointsType.singleChoice,
    isFirstOfLeaf: false,
    isLastOfLeaf: false,
    memberType: 'Council',
  },
  {
    id: '3',
    parentId: 'cp2',
    proposalId: 3,
    level: 1,
    isParent: false,
    haveRouteDetail: false,
    iconColor: '#252422',
    name: 'Polling vote',
    type: ECheckpointsType.polling,
    isFirstOfLeaf: false,
    isLastOfLeaf: false,
    memberType: 'Members',
  },
  {
    id: '4',
    parentId: 'cp3',
    isParent: false,
    level: 1,
    haveRouteDetail: false,
    iconColor: '#252422',
    type: ECheckpointsType.enforcer,
    name: CP_NAME.enforcer,
    isFirstOfLeaf: false,
    isLastOfLeaf: true,
  },
];

export const initValidates: VotingValidateInterface = {
  allowedBy: null,
  allowedRoles: null,
  tokenAddress: null,
  recipientAddress: null,
  minimumHoldingPeriod: null,
  minimumHoldingQuantity: null,
  executionTimeValidate: null,
  endTimeValidate: null,
  startTimeValidate: null,
  startTimeMoreEndTime: null,
};
