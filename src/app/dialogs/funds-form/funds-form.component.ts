import { Component, Inject, OnInit, inject } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog"

@Component({
  selector: 'funds-form',
  templateUrl: 'funds-form.component.html',
  styleUrls: ['funds-form.component.scss']
})

export class FundsFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder)
  private dialogRef = inject(MatDialogRef<FundsFormComponent>)
  public matDialog = inject(MatDialog)
  public fundsForm: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.fundsForm = this.formBuilder.group({
      amount: ['', Validators.required]
    })
  }

  ngOnInit(){}

  public onSubmit(): void {
    this.dialogRef.close(this.fundsForm.get('amount')?.value)
  }
}