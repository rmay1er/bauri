#[cfg_attr(mobile, tauri::mobile_entry_point, debug_assertions)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_devtools::init())
        .run(tauri::generate_context!())
        .expect("ошибка при запуске Tauri приложения");
}
