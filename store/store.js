import { create } from "zustand";
var useResponse = create(function (set) { return ({
    response: "",
    isGenerating: false,
    updateResponse: function (word) { return set(function (state) { return ({ response: state.response + word, isGenerating: true }); }); },
    clearResponse: function (word) { return set(function (state) { return ({ response: word, isGenerating: false }); }); }
}); });
export default useResponse;
