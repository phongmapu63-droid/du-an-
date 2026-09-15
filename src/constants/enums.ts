export enum UserRole {
  SHIPPER = 'SHIPPER',   // Chủ hàng
  TRUCKER = 'TRUCKER',   // Chủ xe / Đội xe
  DRIVER = 'DRIVER',     // Tài xế
}

export enum TripStatus {
  AVAILABLE = 'AVAILABLE',     // Đang rỗng, chờ ghép đơn
  MATCHED = 'MATCHED',         // Đã ghép được đơn
  IN_PROGRESS = 'IN_PROGRESS', // Đang thực hiện chuyến
  COMPLETED = 'COMPLETED',     // Hoàn tất
}

export enum BookingStatus {
  PENDING = 'PENDING',     // Chờ xác nhận
  PAID = 'PAID',           // Đã cọc/thanh toán
  PICKED_UP = 'PICKED_UP', // Đã lấy hàng
  DELIVERED = 'DELIVERED', // Đã giao hàng
  CANCELLED = 'CANCELLED', // Đã hủy
}
