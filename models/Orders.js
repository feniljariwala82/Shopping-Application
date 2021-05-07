import moment from "moment";

class Order {
  constructor(id, items, totalAmount, orderedDate) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.orderedDate = orderedDate;
  }

  get readableDate() {
    return moment(this.orderedDate).format("MMMM Do YYYY, hh:mm");
  }
}

export default Order;
