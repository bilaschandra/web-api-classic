import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from 'src/app/classes/transaction';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admintransaction',
  templateUrl: './admintransaction.component.html',
  styleUrls: ['./admintransaction.component.scss']
})
export class AdmintransactionComponent implements OnInit {
  @Input() type: string = "";
  public transaction: Transaction = new Transaction();
  isedit: boolean = true;
  public editTransaction: Transaction[] = new Array<Transaction>();
  opendd: number = -1;
  selected: string;
  filterValue: string;

  constructor(
    private transactionService: TransactionService,
    private datePipe: DatePipe
  ) {
    this.getTransaction();
  }

  ngOnInit() { }

  selectedtab(value: string) {
    switch (value) {
      case 'Edit':
        this.isedit = true;
        break;
      default:
        this.isedit = false;
        break;
    }
  }


  getTransaction() {
    this.transactionService.getAllTransaction().subscribe(data => {
      if (data['records'] == null)
        return;

      data['records'].forEach(element => {
        this.editTransaction.push(
          new Transaction(
            element['id'],
            element['user_id'],
            element['address_id'],
            element['invoice_no'],
            element['transaction_no'],
            element['status'],
            element['Amount'],
            element['currency'],
            element['error_messaage'],
            element['success_message'],
            this.dateFormate(element['transaction_date']),
          )
        );
      });
    });
  }

  dateFormate(date) {
    if (!date || date == '0000-00-00') {
      return '';
    }
    return this.datePipe.transform(date, 'MM/dd/yyyy');
  }

  saveTransaction(item: Transaction) {
    this.transactionService.updateTransaction(item).subscribe();
  }

  toggle(catId): void {

    if (catId == this.opendd) {
      this.opendd = -1;

      (document.getElementById('status_' + catId) as HTMLInputElement).disabled = true;

      var element = document.getElementById('add_' + catId);
      element.style.display = null;
      element.style.display = "none";

      var element = document.getElementById('edit_' + catId);
      element.style.display = null;

    } else {
      this.opendd = catId;

      (document.getElementById('status_' + catId) as HTMLInputElement).disabled = false;

      var element = document.getElementById('edit_' + catId);
      element.style.display = null;
      element.style.display = "none";

      var element = document.getElementById('add_' + catId);
      element.style.display = null;
    }
  }

}
