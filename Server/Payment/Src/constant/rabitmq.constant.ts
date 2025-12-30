//! RabbitMQ Exchanges
export const EXCHANGES = {
  PROFILE: "profile_exchange",
  AUTH: "auth_exchange",
  NOTIFICATION: "notification_exchange",
  PAYMENT: "payment_exchange",
};

//! ROUTING KEYS
export const ROUTING_KEYS = {
  PROFILE: {
    CREATE: "profile.create",
    VERIFY: "profile.verify",
    ADDED_CRADIT: "profile.added_cradit",
  },
  AUTH: {
    UPDATE_USER_ID: "auth.update_user_id",
  },
  NOTIFICATION: {
    WELCOME_EMAIL: "notification.welcome_email",
    VERIFICATION_EMAIL: "notification.verification_email",
  },

  PAYMENT: {
    ADD_CRADIT: "payment.craditadd",
  },
};
