export type IconName =
  | 'room_service'
  | 'dark_mode'
  | 'light_mode'
  | 'person'
  | 'arrow_forward'
  | 'arrow_downward'
  | 'explore'
  | 'wifi'
  | 'local_mall'
  | 'skillet'
  | 'verified_user'
  | 'touch_app'
  | 'table_restaurant'
  | 'sentiment_satisfied'
  | 'menu_book'
  | 'check_circle'
  | 'cancel'
  | 'qr_code_scanner'
  | 'qr_code_2'
  | 'bolt'
  | 'receipt_long'
  | 'insights'
  | 'tune'
  | 'cell_tower'
  | 'dinner_dining'
  | 'calendar_today'
  | 'inventory_2'
  | 'dashboard_customize'
  | 'sync_alt'
  | 'mail'
  | 'add'
  | 'dashboard'
  | 'badge'
  | 'trending_up'
  | 'priority_high'
  | 'star'
  | 'policy'
  | 'campaign'
  | 'auto_awesome'
  | 'military_tech'
  | 'bar_chart'
  | 'settings'
  | 'storefront'
  | 'support_agent'
  | 'keyboard_double_arrow_left'
  | 'keyboard_double_arrow_right'
  | 'restaurant'
  | 'arrow_drop_down'
  | 'search'
  | 'help_outline'
  | 'notifications'
  | 'expand_more'
  | 'menu'
  | 'close'
  | 'visibility'
  | 'visibility_off'
  | 'check'
  | 'shield'
  | 'security'
  | 'email'
  | 'location_on'
  | 'pin_drop'
  | 'store'
  | 'edit'
  | 'arrow_back'
  | 'add_business'
  | 'verified'
  | 'info'
  | 'chevron_right'
  | 'lock'
  | 'save'
  | 'radio_button_unchecked'
  | 'delete'
  | 'filter_list'
  | 'chat'
  | 'share'
  | 'refresh'
  | 'download'
  | 'group_add'
  | 'check_box'
  | 'more_vert'
  | 'warning'
  | 'thumb_up'
  | 'content_copy'
  | 'attach_file'
  | 'send'
  | 'restaurant_menu'
  | 'history'
  | 'timer'
  | 'flag'
  | 'error'
  | 'forum'
  | 'camera_alt';

type IconProps = {
  name: IconName;
  className?: string;
  decorative?: boolean;
  style?: React.CSSProperties;
};

export function Icon({ name, className = '', decorative = true, style }: IconProps) {
  return (
    <span
      aria-hidden={decorative ? true : undefined}
      className={`material-symbols-outlined ${className}`.trim()}
      role={decorative ? undefined : 'img'}
      style={style}
    >
      {name}
    </span>
  );
}
