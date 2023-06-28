
export interface TS5MessageHandlerOptions {
  handleAuthMessage?: (data: IAuthMessage) => void;
  handleClientMoved?: (data: IClientMovedMessage) => void;
  handleClientPropertiesUpdate?: (data: IClientPropertiesUpdatedMessage) => void;
  handleTalkStatusChanged?: (data: ITalkStatusChangedMessage) => void;
  handleClientSelfPropertyUpdated?: (data: IClientSelfPropertyUpdatedMessage) => void;
}

export interface IAuthSenderPayload {
  type: "auth";
  payload: {
    identifier: string;
    version: string;
    name: string;
    description: string;
    content: {
      apiKey: string;
    };
  };
}

export interface IClient {
  id: number;
  talkStatus: number;
  channel: IChannel;
  properties: IClientProperties;
}

export interface IChannel {
  id: number;
  connection: IConnection;
  order: string;
  parentId: string;
  properties: IChannelProperties;
}

export interface IConnection {
  channelInfos?: IChannelInfos;
  clientId: number;
  clientInfos?: IClientInfo[];
  id: number;
  properties?: IServerProperties;
}


export interface IChannelProperties {
  bannerGfxUrl: string;
  bannerMode: number;
  codec: number;
  codecIsUnencrypted: boolean;
  codecLatencyFactor: number;
  codecQuality: number;
  deleteDelay: number;
  description: string;
  flagAreSubscribed: boolean;
  flagDefault: boolean;
  flagMaxclientsUnlimited: boolean;
  flagMaxfamilyclientsInherited: boolean;
  flagMaxfamilyclientsUnlimited: boolean;
  flagPassword: boolean;
  flagPermanent: boolean;
  flagSemiPermanent: boolean;
  forcedSilence: boolean;
  iconId: number;
  maxclients: number;
  maxfamilyclients: number;
  name: string;
  namePhonetic: string;
  neededTalkPower: number;
  order: string;
  permissionHints: number;
  storageQuota: number;
  topic: string;
  uniqueIdentifier: string;
}


export interface IChannelInfos {
  rootChannels: IChannel[];
  subChannels: { [key: number]: IChannel[] };
}

export interface IClientInfo {
  channelId: number;
  id: number;
  properties: IClientProperties;
}

export interface IClientProperties {
  away: boolean;
  awayMessage: string;
  badges: string;
  channelGroupId: string;
  channelGroupInheritedChannelId: string;
  country: string;
  created: number;
  databaseId: string;
  defaultChannel: string;
  defaultChannelPassword: string;
  defaultToken: string;
  description: string;
  flagAvatar: string;
  flagTalking: boolean;
  iconId: number;
  idleTime: number;
  inputDeactivated: boolean;
  inputHardware: boolean;
  inputMuted: boolean;
  integrations: string;
  isChannelCommander: boolean;
  isMuted: boolean;
  isPrioritySpeaker: boolean;
  isRecording: boolean;
  isTalker: boolean;
  lastConnected: number;
  metaData: string;
  monthBytesDownloaded: number;
  monthBytesUploaded: number;
  myteamspeakAvatar: string;
  myteamspeakId: string;
  neededServerQueryViewPower: number;
  nickname: string;
  nicknamePhonetic: string;
  outputHardware: boolean;
  outputMuted: boolean;
  outputOnlyMuted: boolean;
  permissionHints: number;
  platform: string;
  serverGroups: string;
  serverPassword: string;
  signedBadges: string;
  talkPower: number;
  talkRequest: number;
  talkRequestMsg: string;
  totalBytesDownloaded: number;
  totalBytesUploaded: number;
  totalConnections: number;
  type: number;
  uniqueIdentifier: string;
  unreadMessages: number;
  userTag: string;
  version: string;
  volumeModificator: number;
}

export interface IServerProperties {
  antiFloodPointsNeededCommandBlock: number;
  antiFloodPointsNeededIpBlock: number;
  antiFloodPointsNeededPluginBlock: number;
  antiFloodPointsTickReduce: number;
  askForPrivilegeKeyAfterNickname: boolean;
  askForPrivilegeKeyForChannelCreation: boolean;
  askForPrivilegeKeyForModify: boolean;
  awayMessage: string;
  badges: string;
  channelGroupId: string;
  channelGroupInheritedChannelId: string;
  clientType: number;
  connectionBandwidthReceived: number;
  connectionBandwidthSent: number;
  connectionClientIp: string;
  connectionConnectedTime: number;
  connectionFiletransferBandwidthReceived: number;
  connectionFiletransferBandwidthSent: number;
  connectionPacketloss: number;
  connectionPing: number;
  connectionPacketsReceived: number;
  connectionPacketsSent: number;
  connectionPort: number;
  connectionQueryBandwidthReceived: number;
  connectionQueryBandwidthSent: number;
  connectionServerIp: string;
  connectionServerPort: number;
  connectionThrottleBandwidthReceived: number;
  connectionThrottleBandwidthSent: number;
  country: string;
  created: number;
  defaultChannel: string;
  defaultChannelPassword: string;
  defaultServerGroup: string;
  defaultToken: string;
  flagAvatar: string;
  iconId: number;
  inputHardware: boolean;
  inputMuted: boolean;
  isChannelCommander: boolean;
  isMuted: boolean;
  isPrioritySpeaker: boolean;
  isRecording: boolean;
  isTalker: boolean;
  isTts: boolean;
  metaData: string;
  monthBytesDownloaded: number;
  monthBytesUploaded: number;
  myteamspeakAvatar: string;
  myteamspeakId: string;
  neededServerQueryViewPower: number;
  nickname: string;
  nicknamePhonetic: string;
  outputHardware: boolean;
  outputMuted: boolean;
  outputOnlyMuted: boolean;
  permissionHints: number;
  platform: string;
  serverPassword: string;
  signedBadges: string;
  talkPower: number;
  talkRequest: number;
  talkRequestMsg: string;
  totalBytesDownloaded: number;
  totalBytesUploaded: number;
  totalConnections: number;
  type: number;
  uniqueIdentifier: string;
  unreadMessages: number;
  userTag: string;
  version: string;
  volumeModificator: number;
}


export interface IClientPropertiesUpdatedMessage {
  type: "clientPropertiesUpdated";
  payload: {
    clientId: number;
    connectionId: number;
    properties: IClientProperties;
  };
}

export interface IClientMovedMessage {
  type: "clientMoved";
  payload: {
    properties: IClientProperties;
    clientId: number;
    connectionId: number;
    newChannelId: number;
    oldChannelId: number;
    type: number;
    visibility: number;
  };
}

export interface ITalkStatusChangedMessage {
  type: "talkStatusChanged";
  payload: {
    clientId: number;
    connectionId: number;
    isWhisper: boolean;
    status: number;
  };
}

export interface IClientSelfPropertyUpdatedMessage {
  type: "clientSelfPropertyUpdated";
  payload: {
    connectionId: number;
    flag: string;
    newValue: boolean;
    oldValue: boolean;
  };
}

export interface IAuthMessage {
  type: "auth";
  payload: {
    apiKey: string;
    connections: IConnection[];
  };
}

export interface IServerPropertiesUpdatedMessage {
  type: "serverPropertiesUpdated";
  payload: {
    connectionId: number;
    properties: IServerProperties;
  };
}

export interface IConnectStatusChangedMessage {
  type: "connectStatusChanged";
  payload: {
    connectionId: number;
    error: number;
    info: {
      clientId: number;
    }
    status: number;
  };
}

export interface IChannelsMessage {
  type: "channels";
  payload: {
    connectionId: number;
    info: IChannelInfos
  }
}