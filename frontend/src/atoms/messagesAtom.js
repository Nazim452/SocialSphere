import { atom } from "recoil";

export const conversationsAtom = atom({
	key: "conversationsAtom",
	default: [],
});


// Taki pata  chal sake ki right side me kon sa chat open hai

export const selectedConversationAtom = atom({
	key: "selectedConversationAtom",
	default: {
		_id: "",
		userId: "",
		username: "",
		userProfilePic: "",
	},
});
