<template>
  <md-content>
    <md-dialog ref="create_new_file" :md-active.sync="showDialog" :md-click-outside-to-close="false" :md-close-on-esc="false">
      <md-dialog-title>Create new file</md-dialog-title>
      <md-dialog-content>
        <md-field>
          <label>File name</label>
          <md-input v-model="filename" id="create-filename-input"></md-input>
        </md-field>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click.native="createNew()" id='create-new-file-button'>Create</md-button>
        <md-button @click.native="openFromGDrive()" id='open-from-gdrive-button'>open from Google Drive <img v-bind:src="gdriveSvg" /></md-button>
      </md-dialog-actions>
    </md-dialog>
  </md-content>
</template>

<script>
import gdriveSvg from '@/assets/google-drive.svg'
import { file } from '@/services'

export default {
  data () {
    return {
      showDialog: false,
      filename: 'New document',
      gdriveSvg
    }
  },
  methods: {
    openDialog () {
      this.showDialog = true
    },
    createNew () {
      this.showDialog = false
      file.createNewFile(this.filename)
    },
    openFromGDrive () {
      file.openFromGDrive()
        .then(() => { this.showDialog = false })
        .catch((er) => {
          console.info('Canceled gapi picker.')
          console.info(er)
        })
    },
    updateFilename ($event) {
      this.filename = $event.value
      console.log(this.filename)
    }
  }
}
</script>
