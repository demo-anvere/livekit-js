import type TypedEventEmitter from 'typed-emitter';
import { SignalClient, SignalOptions } from '../api/SignalClient';
import type { InternalRoomOptions } from '../options';
import { DataPacket, DataPacket_Kind, DisconnectReason, SpeakerInfo, TrackInfo, UserPacket } from '../proto/livekit_models';
import { AddTrackRequest, JoinResponse } from '../proto/livekit_rtc';
import PCTransport from './PCTransport';
import type LocalTrack from './track/LocalTrack';
import type LocalVideoTrack from './track/LocalVideoTrack';
import type { SimulcastTrackInfo } from './track/LocalVideoTrack';
import type { TrackPublishOptions } from './track/options';
declare const RTCEngine_base: new () => TypedEventEmitter<EngineEventCallbacks>;
/** @internal */
export default class RTCEngine extends RTCEngine_base {
    private options;
    publisher?: PCTransport;
    subscriber?: PCTransport;
    client: SignalClient;
    rtcConfig: RTCConfiguration;
    peerConnectionTimeout: number;
    get isClosed(): boolean;
    private lossyDC?;
    private lossyDCSub?;
    private reliableDC?;
    private reliableDCSub?;
    private subscriberPrimary;
    private primaryPC?;
    private pcState;
    private _isClosed;
    private pendingTrackResolvers;
    private hasPublished;
    private url?;
    private token?;
    private signalOpts?;
    private reconnectAttempts;
    private reconnectStart;
    private fullReconnectOnNext;
    private clientConfiguration?;
    private connectedServerAddr?;
    private attemptingReconnect;
    private reconnectPolicy;
    private reconnectTimeout?;
    private participantSid?;
    /** keeps track of how often an initial join connection has been tried */
    private joinAttempts;
    /** specifies how often an initial join connection is allowed to retry */
    private maxJoinAttempts;
    private closingLock;
    constructor(options: InternalRoomOptions);
    join(url: string, token: string, opts: SignalOptions, abortSignal?: AbortSignal): Promise<JoinResponse>;
    close(): Promise<void>;
    addTrack(req: AddTrackRequest): Promise<TrackInfo>;
    removeTrack(sender: RTCRtpSender): void;
    updateMuteStatus(trackSid: string, muted: boolean): void;
    get dataSubscriberReadyState(): string | undefined;
    get connectedServerAddress(): string | undefined;
    private configure;
    private makeRTCConfiguration;
    private createDataChannels;
    private handleDataChannel;
    private handleDataMessage;
    private handleDataError;
    private setPreferredCodec;
    createSender(track: LocalTrack, opts: TrackPublishOptions, encodings?: RTCRtpEncodingParameters[]): Promise<RTCRtpSender>;
    createSimulcastSender(track: LocalVideoTrack, simulcastTrack: SimulcastTrackInfo, opts: TrackPublishOptions, encodings?: RTCRtpEncodingParameters[]): Promise<RTCRtpSender | undefined>;
    private createTransceiverRTCRtpSender;
    private createSimulcastTransceiverSender;
    private createRTCRtpSender;
    private handleDisconnect;
    private attemptReconnect;
    private getNextRetryDelay;
    private restartConnection;
    private resumeConnection;
    waitForPCConnected(): Promise<void>;
    sendDataPacket(packet: DataPacket, kind: DataPacket_Kind): Promise<void>;
    /**
     * @internal
     */
    ensureDataTransportConnected(kind: DataPacket_Kind, subscriber?: boolean): Promise<void>;
    private ensurePublisherConnected;
    /** @internal */
    negotiate(): Promise<void>;
    dataChannelForKind(kind: DataPacket_Kind, sub?: boolean): RTCDataChannel | undefined;
    private clearReconnectTimeout;
    private clearPendingReconnect;
    private handleBrowserOnLine;
    private registerOnLineListener;
    private deregisterOnLineListener;
}
export type EngineEventCallbacks = {
    connected: (joinResp: JoinResponse) => void;
    disconnected: (reason?: DisconnectReason) => void;
    resuming: () => void;
    resumed: () => void;
    restarting: () => void;
    restarted: (joinResp: JoinResponse) => void;
    signalResumed: () => void;
    closing: () => void;
    mediaTrackAdded: (track: MediaStreamTrack, streams: MediaStream, receiver?: RTCRtpReceiver) => void;
    activeSpeakersUpdate: (speakers: Array<SpeakerInfo>) => void;
    dataPacketReceived: (userPacket: UserPacket, kind: DataPacket_Kind) => void;
    transportsCreated: (publisher: PCTransport, subscriber: PCTransport) => void;
};
export {};
//# sourceMappingURL=RTCEngine.d.ts.map