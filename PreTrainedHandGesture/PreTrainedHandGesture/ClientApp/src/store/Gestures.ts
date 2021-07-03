import { Action, Reducer } from 'redux';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface GesturesState {
    name: string    
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

export interface SingleHandGesture { type: 'SINGLE_HAND' }
export interface EyeGesture { type: 'EYE' }

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = SingleHandGesture | EyeGesture;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    trackSingleHand: () => ({ type: 'SINGLE_HAND' } as SingleHandGesture),
    trackEye: () => ({ type: 'EYE' } as EyeGesture)
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<GesturesState> = (state: GesturesState | undefined, incomingAction: Action): GesturesState => {

    if (state === undefined) {
        return { name: "" };
    }

    const action = incomingAction as KnownAction;

    switch (action.type) {
        case 'SINGLE_HAND':
            return { name: 'SINGLE_HAND_GESTURE'};
        case 'EYE':
            return { name: 'EYE_GESTURE' };
        default:
            return state;
    }
};
