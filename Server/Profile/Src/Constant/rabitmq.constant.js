//! RabbitMQ Exchanges
export const EXCHANGES = {
  PROFILE: "profile_exchange",
  AUTH: "auth_exchange",
};

//! ROUTING KEYS
export const ROUTING_KEYS = {
  PROFILE: {
    CREATE: "profile.create",
  },
  AUTH:{
    UPDATE_USER_ID:"auth.update_user_id"
  }
};
