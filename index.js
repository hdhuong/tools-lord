const fs = require("fs");
const XLSX = require("xlsx");

// Your JSON data for each sheet
const sheetData = {
  master: {
    contact: {
      commonTitle: "Kết nối ngay với chúng tôi",
      title: "Hãy bắt đầu từ việc để lại thông tin của bạn theo mẫu dưới đây!",
      fullName: "Họ và tên",
      phoneNumber: "Số điện thoại",
      workEmail: "Email công việc",
      enterpriseName: "Tên doanh nghiệp",
      area: "Khu vực",
      currentRole: "Chức vụ hiện tại",
      workType: "Lĩnh vực",
      interestFeature: "Tính năng anh chị đang quan tâm",
      experientalPurpose: "Mục đích đăng ký trải nghiệm",
      contactUs: "  Liên hệ chúng tôi",
      action: "Hành động",
    },
    currentRole: {
      itManager: "IT Manager",
      productionManager: "Quản lý sản xuất",
      warehouseManager: "Quản lý kho",
      generalManager: "Quản đốc",
      productionMaintainance: "Bảo trì sản xuất",
      other: "Khác",
    },
    bussinessType: {
      furniture: "Gỗ & nội thất",
      plastic: "Nhựa & bao bì",
      textile: "Dệt may & da giày",
      accessary: "Linh kiện phụ tùng",
      chemical: "Hoá chất",
      buildingMaterial: "Vật liệu xây dựng",
      metal: "Kim loại",
      mechanical: "Máy móc, thiết bị, cơ khí",
      medicalEquipment: "Thiết bị y tế",
      medicine: "Dược phẩm",
      electricity: "Điện",
      agriculture: "Nông lâm thủy sản",
      retail: "Bán lẻ",
      logistic: "Logistics",
      other: "Khác",
    },
    interestFeature: {
      productionManagement: "Quản lý sản xuất",
      deviceManagement: "Quản lý và bảo trì thiết bị",
      warehouseStockManagement: "Quản lý hàng tồn kho",
      productionQuality: "Quản lý chất lượng sản xuất",
      seekOrigin: "Truy xuất nguồn gốc",
      devicePerformance: "Hiệu suất thiết bị, máy móc",
      productionReport: "Báo cáo sản xuất",
      other: "Khác",
    },
    experimentalPurpose: {
      companySolution: "Ứng dụng giải pháp cho công ty",
      consultAndLearn: "Tham khảo, học hỏi",
      consultation: "Nhận demo và tư vấn",
      other: "Khác",
    },
    form: {
      required: "Mục này bắt buộc phải nhập",
    },
    menu: {
      guest: "Danh sách khách",
      guestDetail: "Chi tiết khách",
    },
    guest: {
      title: "Danh sách khách",
    },
    guestContactStatus: {
      waitingForRegistration: "Chờ đăng ký",
      confirmed: "Xác nhận",
      rejected: "Từ chối",
    },
    common: {
      notify: "Thông báo",
      no: "Không",
      yes: "Có",
    },
  },
  general: {
    page: {
      searchButton: "Tìm kiếm",
      searchPlaceholder: "Tìm kiếm thông tin",
      goBack: "Quay lại trang trước",
      copyright: "Một sản phẩm của VTI - Solution ©{{year}}",
      logout: "Đăng xuất",
      darkMode: "Chế độ tối",
      userInfo: "Thông tin cá nhân",
      changePassword: "Đổi mật khẩu",
    },
    form: {
      required: "Mục này bắt buộc phải nhập",
      mappingPassword: "* Mật khẩu không mapping",
      maxLength: "Nhập tối đa {{max}} kí tự",
      minLength: "Nhập tối thiểu {{min}} kí tự",
      length: "Nhập đủ {{length}} kí tự",
      validEmail: "Bạn hãy nhập đúng email",
      validUserName: "Tên đăng nhập chỉ gồm chữ và số",
      validPassword: "Mật khẩu chỉ gồm chữ và số",
      validatePassword:
        "Mật khẩu phải bao gồm ít nhất 1 ký tự chữ hoa, chữ thường, số và ký tự đặc biệt",
      validPhone: "Số điện thoại không hợp lệ",
      validCode: "Mã chỉ gồm chữ và số, ít nhất 1 chữ và 1 số",
      minNumber: "Giá trị tối thiểu là {{min}}",
      maxNumber: "Không được nhập quá {{max}}",
      moreThanNumber: "Giá trị phải lớn hơn {{min}}",
      duplicates: "Mục này không được trùng lặp",
      dateRange: "Ngày phải thuộc khoảng từ {{from}} đến {{to}}",
      minDate: "Ngày bắt đầu phải bằng hoặc sau {{from}}",
      maxDate: "Ngày kết thúc phải bằng hoặc trước {{to}}",
      maxDateBigger: "Ngày kết thúc phải bằng hoặc sau {{from}}",
      biggerThanMinDate: "Ngày bắt đầu phải sau {{from}}",
      smallerThanMaxDate: "Ngày kết thúc phải trước {{to}}",
      invalidDateRange: "Ngày bắt đầu phải nhỏ hơn ngày kết thúc",
      to: "đến",
      greaterThanZero: "Bắt buộc phải lớn hơn 0",
      smallerThan: "Bắt buộc phải nhỏ hơn {{max}}",
      integer: "Mục này phải là số nguyên",
      numeric: "Mục này phải là số",
      invalidTimeRange: "Thời gian kết thúc phải lớn hơn thời gian bắt đầu",
      invalidTimeStart:
        "Thời gian bắt đầu ca sau phải bằng thời gian kết thúc ca trước",
      special: "Mục này không được chứa kí tự đặc biệt",
      invalidBreakTime:
        "Thời gian nghỉ phải thuộc khoảng thời gian làm việc của ca",
      validTime: "Thời gian không hợp lệ",
      validJson: "Mục này phải có định dạng JSON",
      validUrl: "Mục này phải là đường dẫn URL",
      minItem: "Chọn tối thiểu {{min}} sản phẩm",
      allowDemicalAfterPoint: "Giới hạn {{number}} ký tự sau dấu chấm",
      invalidInformation: "Thông tin {{object}} không hợp lệ",
      codeDupicate: "Dữ liệu Mã đã tồn tại",
      invalidEmail: "Định dạng email không hợp lệ",
    },
    toast: {
      notificationTitle: "Thông báo",
      defaultError: "Đã xảy ra lỗi",
      changeStatusSuccess: "Đổi trạng thái bản ghi thành công",
      changeStatusError: "Đổi trạng thái bản ghi thất bại",
      deleteSuccess: "Xóa bản ghi thành công",
      deleteError: "Xóa bản ghi thất bại",
    },
    autocomplete: {
      noOptionsText: "Không có dữ liệu",
      loadingText: "Đang tải dữ liệu...",
      hint: "Nhập từ khoá tìm kiếm",
      quickCreate: "Tạo nhanh",
      selectAll: "Chọn tất cả",
    },
    dateRangePicker: {
      from: "Từ ngày",
      to: "Đến ngày",
    },
    dataTable: {
      visibleColumns: "Hiển thị các mục đã chọn",
      filterTitle: "Tìm kiếm",
      filterButton: "Tìm kiếm",
      cancel: "Hủy",
      title: "Danh sách",
      noData: "Không có dữ liệu",
      showAllColumns: "Tất cả",
      tableSetting: {
        dialogTitle: "Cấu hình hiển thị",
        save: "Lưu",
        cancel: "Huỷ",
        reset: "Đặt lại mặc định",
        name: "Tên cột mặc định",
        aliasName: "Tên cột tuỳ chỉnh",
        minWidth: "Độ rộng tối thiểu",
        width: "Độ rộng tuỳ chỉnh",
        visible: "Hiển thị",
        sticky: "Cố định",
        side: "Phía",
        left: "Trái",
        right: "Phải",
        validateSmallerThanMinWidth: "Không được nhỏ hơn độ rộng tối thiểu",
      },
    },
    pagination: {
      rowsPerPage: "Số dòng mỗi trang",
      startEndRows: "{{start}} - {{end}} trên tổng số {{rows}}",
    },
    date: {
      minToday: "Không được chọn trước ngày hiện tại",
      maxToday: "Ngày sinh phải nhỏ hơn ngày hiện tại",
    },
    month: {
      jan: "Tháng 1",
      feb: "Tháng 2",
      mar: "Tháng 3",
      apr: "Tháng 4",
      may: "Tháng 5",
      jun: "Tháng 6",
      jul: "Tháng 7",
      aug: "Tháng 8",
      sep: "Tháng 9",
      oct: "Tháng 10",
      nov: "Tháng 11",
      dec: "Tháng 12",
      s_jan: "T1",
      s_feb: "T2",
      s_mar: "T3",
      s_apr: "T4",
      s_may: "T5",
      s_jun: "T6",
      s_jul: "T7",
      s_aug: "T8",
      s_sep: "T9",
      s_obt: "T10",
      s_nov: "T11",
      s_dec: "T12",
    },
    quarter: {
      one: "Quý 1",
      two: "Quý 2",
      three: "Quý 3",
      four: "Quý 4",
    },
    day: {
      monday: "Thứ 2",
      tueday: "Thứ 3",
      wenesday: "Thứ 4",
      thurday: "Thứ 5",
      friday: "Thứ 6",
      saturday: "Thứ 7",
      sunday: "Chủ nhật",
      s_monday: "T2",
      s_tueday: "T3",
      s_wenesday: "T4",
      s_thurday: "5",
      s_friday: "T6",
      s_saturday: "T7",
      s_sunday: "CN",
    },
    seconds: "Giây",
    minutes: "Phút",
    hours: "Giờ",
    days: "Ngày",
    weeks: "Tuần",
    months: "Tháng",
    quarters: "Quý",
    years: "Năm",
    ganttChart: {
      taskName: "Công việc",
      completed: "Tiến độ",
      startDate: "Ngày bắt đầu",
      endDate: "Ngày kết thúc",
    },
    actionBar: {
      accept: "Xác nhận",
      back: "Quay lại",
      cancel: "Huỷ",
      create: "Tạo mới",
      save: "Lưu",
      import: "Nhập dữ liệu",
      closeNotification: "Đóng thông báo",
      importAgain: "Nhập lại",
      draft: "Lưu nháp",
      approve: "Lưu và đề nghị duyệt",
      close: "Đóng",
      editInfo: "Sửa thông tin",
      saveInfo: "Lưu thông tin",
      delete: "Xóa",
      send: "Gửi",
    },
    importExportMenu: {
      import: "Nhập dữ liệu",
      export: "Xuất dữ liệu",
      importExport: "Nhập/xuất dữ liệu",
    },
    import: {
      title: "Nhập dữ liệu",
      stepDownloadTemplate: {
        title: "Bước 1: Tải xuống mẫu dữ liệu",
        description: "và điền theo hướng dẫn",
      },
      downloadTemplate: "Tải Template mẫu",
      stepUploadData: {
        title: "Tải lên thông tin hoàn chỉnh",
        description: "Chọn hoặc thả một tệp vào vùng này để Import dữ liệu",
        support: "Hỗ trợ file ",
        fileType: "XLSX",
      },
      result: "Đã nhập {0} dòng thành công",
      log: "Nhấn vào để tải xuống kết quả nhập dữ liệu",
      unexpectedError: "Đã xảy ra lỗi khi nhập dữ liệu",
      prefix: {
        importLog: "ImportLog",
        importTemplate: "ImportTemplate",
      },
    },
    fileUpload: {
      error: {
        invalidType:
          "File tải lên không đúng định dạng quy định. Vui lòng tải lên file có định dạng",
        invalidSize: "Dung lượng file không hợp lệ. Giới hạn dung lượng là",
        invalidNumberOfFiles:
          "Số lượng file tải lên không được quá {{max}} file",
        lineError: "Lỗi ở dòng thứ",
      },
      drag: "Kéo thả file vào đây hoặc",
      selectFile: "chọn file",
      accept: "Chấp nhận",
      acceptAll: "Tất cả",
      noData: "Không có tệp tin nào",
      title: "File đính kèm",
      upload: "Tải lên",
    },
    notification: {
      heading: "Thông báo",
      readOne: "Đánh dấu là đã đọc",
      noData: "Không có thông báo",
      readAll: "Đã đọc tất cả",
      turnOff: "Tắt thông báo",
      turnOn: "Bật thông báo",
      notificationIsOff: "Thông báo đang Tắt",
      hoursAgo: "{{time}} giờ trước",
      minutesAgo: "{{time}} phút trước",
      created: "đã tạo",
      action: {
        confirm: "Xác nhận",
        reject: "Từ chối",
      },
    },
    message: {
      fieldIsRequired: "Mục này bắt buộc phải nhập.",
      unknownError: "Có lỗi xảy ra vui lòng thử lại",
      noData: "Không có dữ liệu.",
      lessThan: "Giá trị phải nhỏ hơn {{max}}",
      exportSuccess: "Xuất dữ liệu thành công",
      changePasswordSucces: "Đổi mật khẩu thành công",
    },
    modal: {
      btnSubmit: "Xác nhận",
      btnCancel: "Huỷ",
      btnClose: "Đóng",
    },
    common: {
      yes: "Có",
      no: "Không",
      active: "Hoạt động",
      inActive: "Tạm khóa",
      status: "Trạng thái",
      cancel: "Huỷ",
      close: "Đóng",
      back: "Quay lại",
      action: "Hành động",
      create: "Tạo mới",
      update: "Cập nhật",
      delete: "Xóa",
      save: "Lưu",
      print: "In",
      createdAt: "Ngày tạo",
      updatedAt: "Ngày sửa",
      accept: "Xác nhận",
      confirm: "Xác nhận",
      reject: "Từ chối",
      notify: "Thông báo",
      confirmMessage: {
        confirm: "Bạn có chắc chắn muốn xác nhận không?",
        reject: "Bạn có chắc chắn muốn từ chối không?",
      },
      creator: "Người tạo",
      search: "Tìm kiếm",
      filter: "Lọc",
      percent: "%",
      null: "N/A",
      system: "Hệ thống",
      file: "File đính kèm",
      searchPlaceholder: "Tìm kiếm thông tin...",
      reason: "Lý do",
      reasonPlaceholder: "Nhập lý do",
      confirm_execute: "Xác nhận thực hiện",
      activePending: "Hoạt động/Tạm dừng",
      clone: "Sao chép",
      all: "Tất Cả",
      sync: "Đồng Bộ",
      working: "Đang Làm Việc",
      maternityLeave: "Nghỉ Thai Sản",
      quit: "Đã Nghỉ Việc",
      error: "Lỗi",
      success: "Thành công",
      pending: "Tạm dừng",
      synError: "Đồng Bộ Lỗi",
      unregistered: "Chưa Đăng Ký Tuyến",
      inputKeyWord: "Nhập từ khóa",
      approve: "Phê duyệt",
      noApprove: "Chưa duyệt",
      registerRoute: "Đăng ký tuyến",
      email: "Email",
      confirmSync: "Bạn có chắc chắn muốn đồng bộ ngay không?",
    },
    moduleMenu: {
      configuration: "Thiết lập",
      master: "HRM Dữ Liệu Cơ Sở",
    },
    bulkActions: {
      actions: "Thao tác",
      approve: "Xác nhận",
      reject: "Từ chối",
      delete: "Xoá",
      promptTitle1: "Thông báo",
      promptContent1:
        "Bạn có chắc chắn muốn xác nhận {{number}} bản ghi đã chọn không?",
      promptTitle2: "Thông báo",
      promptContent2:
        "Bạn có chắc chắn muốn từ chối {{number}} bản ghi đã chọn không?",
      promptTitle3: "Thông báo",
      promptContent3:
        "Bạn có chắc chắn muốn xoá {{number}} bản ghi đã chọn không?",
    },
    errorResponse: {
      notAcceptable: "Không có quyền truy cập",
    },
  },
  guest: {
    guest: {
      fullName: "Họ tên",
      phoneNumber: "SĐT",
      workEmail: "Email",
      companyName: "Công ty",
      area: "Địa chỉ",
      currentRole: "Chức vụ",
      workType: "Loại hình",
      interestFeature: "Module quan tâm",
      experientalPurpose: "Mục đích",
      list: "Danh Sách",
      mesxUsername: "Tài khoản mesx",
      action: "Hành động",
      status: "Trạng thái",
      notes: "Danh sách ghi chú",
      addNote: "Thêm ghi chú",
      createAccount: "Tạo account",
      note: "Ghi chú",
      username: "Tài khoản",
      password: "Mật khẩu",
      modules: "Module quan tâm",
      notePlaceholder: "Nhập ghi chú",
      dialog: {
        addNoteModalTitle: "Thêm ghi chú guest",
        createAccountModalTitle: "Tạo tài khoản",
      },
    },
    common: {
      notify: "Thông báo",
      no: "Không",
      yes: "Có",
    },
  },
};

// Function to flatten nested objects into key-value pairs
const flattenObject = (obj, prefix = "") => {
  return Object.keys(obj).reduce((acc, key) => {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null) {
      return { ...acc, ...flattenObject(obj[key], newKey) };
    } else {
      return { ...acc, [newKey]: obj[key] };
    }
  }, {});
};

// Function to convert JSON data to an array of key-value pairs
const convertToKeyValueArray = (jsonData) => {
  const flattenedData = flattenObject(jsonData);
  return Object.entries(flattenedData);
};

// Create a workbook
const wb = XLSX.utils.book_new();

// Process each sheet
for (const sheetName in sheetData) {
  if (sheetData.hasOwnProperty(sheetName)) {
    const jsonData = sheetData[sheetName];
    const keyValueArray = convertToKeyValueArray(jsonData);

    // Create a worksheet
    const ws = XLSX.utils.aoa_to_sheet([["key", "vi"], ...keyValueArray]);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  }
}

// Write the workbook to an Excel file
const excelFileName = "translation.xlsx";
XLSX.writeFile(wb, excelFileName);

console.log(`Excel file "${excelFileName}" created successfully.`);
