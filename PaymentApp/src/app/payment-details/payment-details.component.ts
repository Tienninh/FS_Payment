import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { PaymentDetail } from '../shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styles: []
})
export class PaymentDetailsComponent implements OnInit {
  constructor(public service: PaymentDetailService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord: PaymentDetail): void {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number): void {
    if (confirm('Are you sure to delete this record')) {

      this.service.deletePaymentDetail(id)
        .subscribe({
          next: () => {
            this.service.refreshList(); // Refresh the list after successful deletion
            this.toastr.error('Deleted successfully', 'Payment Detail Register');
          },
          error: (err: any) => { console.log(err); }

        });
    }

  }
}
