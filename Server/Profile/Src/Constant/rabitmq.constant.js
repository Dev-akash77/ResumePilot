//! RabbitMQ Exchanges
export const EXCHANGES = {
  PROFILE: "profile_exchange",
  AUTH: "auth_exchange",
  PAYMENT: "payment_exchange",
};

//! ROUTING KEYS
export const ROUTING_KEYS = {
  PROFILE: {
    CREATE: "profile.create",
    VERIFY: "profile.verify",
    UPDATE_USER_RESUME_CREATION: "profile.update_resume_creation",
    ADDED_CRADIT: "profile.added_cradit",
  },
  AUTH: {
    UPDATE_USER_ID: "auth.update_user_id",
  },

}; 
