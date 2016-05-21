'use babel';
import AlwaysSavedView from './always-saved-view';
import {
    CompositeDisposable
} from 'atom';

var globvar = {
    instantSave: true,
    autoSave : false
};
export default {
    editorSubs: null,
    activate(state) {
        this.editorSubs = new CompositeDisposable();
        this.editorSubs.add(atom.commands.add('atom-workspace', {
            'always-saved:toggle': () => this.toggle()
        }));

        this.editorSubs.add(atom.workspace.observeTextEditors(function(editor) { //onDidAddTextEditor//observeTextEditors
          editor.onDidChange(function() {
              if (globvar.instantSave && globvar.autoSave) {
                  editor.save();
              }
          });
        }));
    },

    deactivate() {
        this.editorSubs.dispose();
    },

    serialize() {
        return {};
    },

    toggle() {
        globvar.autoSave = !globvar.autoSave;
        console.log('AlwaysSaved is toggled and now', globvar.autoSave, "!");
        return;
    }

};
