import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/core/notifications/notifications.service';
import { NoteService } from 'src/app/core/services/note/note.service';
import { DeleteDialogComponent } from 'src/app/landing-page/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allNotes: any[] = [];
  user: any;
  selectedNote: any;

  recordPageEvent: PageEvent = {
    length: 0,
    pageIndex: 1,
    pageSize: 5
  };

  constructor(private router: Router, private noteService: NoteService,
    private notify: NotificationsService,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.getNotes()
  }

  openDialog(note: any) {
    this.assignSelectedNote(note);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { note: note};
    let dialogRef = this.matDialog.open(DeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(value => {
      this.getNotes();
    });
  }

  assignSelectedNote(note: any) {
    this.selectedNote = note;
  }

  edit(id: any) {
    this.router.navigate([`main/create-note/${id}`]);
  }

  getNotes(currentPage: number = 1, per_page: number = 10) {
    this.noteService.getAllNotes(currentPage, per_page).subscribe(res => {
      if (res.status === 'success') {
        this.allNotes = res.data;
        this.recordPageEvent.pageSize = res.per_page;
        this.recordPageEvent.length = res.total;
        this.recordPageEvent.pageIndex = currentPage;
        // this.notify.publishMessages(res.message, 'success', 1);
      } else {
        this.notify.publishMessages(res.message, 'danger', 1);
      }
    }, err => {
      this.notify.publishMessages(err.message, 'danger', 1);
    })
  }

  onPageChangeOngoing(event: PageEvent){
    this.recordPageEvent = { ...this.recordPageEvent, ...event };
    let {pageSize, pageIndex } = this.recordPageEvent;
    pageIndex++;
    this.getNotes(pageIndex, pageSize);    
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/auth/login']);
    location.reload();
  }

}
