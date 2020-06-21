import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from 'src/app/classes/transaction';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { DatePipe } from '@angular/common';
import { ModalService } from 'src/app/services/popup/modal.service';

@Component({
  selector: 'app-admintransaction',
  templateUrl: './admintransaction.component.html',
  styleUrls: ['./admintransaction.component.scss']
})
export class AdmintransactionComponent implements OnInit {
  @Input() type: string = "";
  public transaction: Transaction = new Transaction();
  islist: boolean = true;
  isedit: boolean = false;
  public editTransaction: Transaction[] = new Array<Transaction>();
  public invoices: any = [];
  invoiceNo: string = '';
  opendd: number = -1;
  selected: string;
  filterValue: string;

  constructor(
    private transactionService: TransactionService,
    private datePipe: DatePipe,
    private modalService:ModalService
  ) {
    this.getTransactionInvoiceWise();
  }

  ngOnInit() { }

  selectedtab(value: string) {
    switch (value) {
      case 'List':
        this.getTransactionInvoiceWise();
        this.islist = true;
        this.isedit = false;
        break;
      case 'Edit':
        this.getTransaction();
        this.islist = false;
        this.isedit = true;
        break;
      default:
        this.islist = true;
        this.isedit = false;
        break;
    }
  }


  getTransaction() {
    this.transactionService.getAllTransaction().subscribe(data => {
      if (data['records']) {        
        data['records'].forEach(element => {
          const obj = new Transaction();
          obj.objcpy({...element, transaction_date: this.dateFormate(element['transaction_date'])});
          this.editTransaction.push(obj);
        });
      }
    });
  }

  getTransactionInvoiceWise() {
    this.transactionService.getAllTransactionInvoiceWise().subscribe(data => {
      if (data) {        
        this.invoices = data;
      }
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

  openInvoiceProductModal(Id: string, invoiceNo: string) {
    this.invoiceNo = invoiceNo;
    this.modalService.open(Id);
  }

  onCloseModalResetInvoiceId() {
    this.invoiceNo = '';
  }

}
