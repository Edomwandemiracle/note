import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'src/app/core/notifications/notifications.service';
import { NoteService } from 'src/app/core/services/note/note.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  createForm = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required]
  });
  noteId = null;
  note: any;
  isUpdate = false;
  
  constructor(private router: Router, private fb: FormBuilder, private notify: NotificationsService,
    private noteService: NoteService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.route.params.subscribe(param => {
      this.noteId = param.id;
      if (param.id) {
        this.isUpdate = true;
         this.getNote(this.noteId);
      } else {
        this.initCreateForm();
      }
    })

  }

  initCreateForm() {
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  populateCreateForm() {
    this.createForm = this.fb.group({
      title: [this.note.title, Validators.required],
      content: [this.note.content, Validators.required]
    });
  }

  getNote(id: any) {
    this.noteService.getNote(id).subscribe(res => {
      this.note = res.data;
      this.populateCreateForm();
    });
  }

  create() {
    if (this.isUpdate === false) {
      this.noteService.createNote(this.createForm.value).subscribe(res => {
        if (res.status === 'success') {
          this.notify.publishMessages(res.message, 'success', 1);
          this.router.navigate(['main']);
        } else {
          this.notify.publishMessages(res.message, 'danger', 1);
        }
      }, err => {
        this.notify.publishMessages(err.message, 'danger', 1);
      });
    }

    if (this.isUpdate === true) {
      this.noteService.updateNote(this.noteId, this.createForm.value).subscribe(res => {
        if (res.status === 'success') {
          this.notify.publishMessages(res.message, 'success', 1);
          this.router.navigate(['main']);
        } else {
          this.notify.publishMessages(res.message, 'danger', 1);
        }
      }, err => {
        this.notify.publishMessages(err.message, 'danger', 1);
      });
    }
    
  }

}
