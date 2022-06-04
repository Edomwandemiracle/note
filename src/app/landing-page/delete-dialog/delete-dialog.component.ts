import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService } from 'src/app/core/notifications/notifications.service';
import { NoteService } from 'src/app/core/services/note/note.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteDialogComponent>,
    private noteService: NoteService, @Inject(MAT_DIALOG_DATA) public note: any,
    private notify: NotificationsService){}

  ngOnInit(): void {
    
  }

  close() {
    this.dialogRef.close();
  }

  deleteNote() {
    this.noteService.deleteNote(this.note.note.id).subscribe(res => {
      if (res.status === 'success') {
        this.notify.publishMessages(res.message, 'success', 1);
        this.close();
      } else {
        this.notify.publishMessages(res.message, 'danger', 1);
      }
    }, err => {
      this.notify.publishMessages(err.message, 'danger', 1);
    });
  }

}
