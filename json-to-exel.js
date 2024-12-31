import fs from "fs";
import XLSX from "xlsx";

/**
 * Converts JSON data to an Excel file.
 * @param {Object[]} jsonData - Array of JSON objects to convert.
 * @param {string} fileName - Name of the output Excel file.
 */

function jsonToExcel(jsonData, fileName) {
  // Ensure the JSON has the required format

  const NodeGroupTypeEnum = {
    DEFAULT: "DEFAULT",
    CONDITION: "CONDITION",
    PARAM: "PARAM",
    COMBINE: "COMBINE",
  };

  const FormulaNodeTypeEnum = {
    CONDITION: "CONDITION",
    PARAM: "PARAM",
    COMBINE: "COMBINE",
  };

  const CostCenterTypeEnum = {
    MACHINING: "MACHINING",
    ASSEMBLY: "ASSEMBLY",
    OTHER: "OTHER",
  };

  const ShippingExpenseEnum = {
    DOMESTIC: "DOMESTIC",
    ABROAD: "ABROAD",
    OTHER: "OTHER",
  };

  const CostTypeEnum = {
    STANDARD: "STANDARD",
    IMPLEMENT: "IMPLEMENT",
  };

  const DISPLAY_ENUM = {
    SHOW: "SHOW",
    HIDDEN: "HIDDEN",
  };

  const arr = [
    {
      code: "GR0001",
      name: "CostCenter",
      type: NodeGroupTypeEnum.CONDITION,
      display: DISPLAY_ENUM.SHOW,
      nodeCode: "DFNP00078",
      nodes: [
        {
          code: "DFNC00001",
          name: "Gia công",
          type: FormulaNodeTypeEnum.CONDITION,
          enumValue: CostCenterTypeEnum.MACHINING,
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNC00002",
          name: "Lắp ráp",
          type: FormulaNodeTypeEnum.CONDITION,
          enumValue: CostCenterTypeEnum.ASSEMBLY,
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNC00003",
          name: "Khác",
          type: FormulaNodeTypeEnum.CONDITION,
          enumValue: CostCenterTypeEnum.OTHER,
          display: DISPLAY_ENUM.SHOW,
        },
      ],
    },
    {
      code: "GR0002",
      name: "Chi phí vận chuyển",
      type: NodeGroupTypeEnum.CONDITION,
      display: DISPLAY_ENUM.SHOW,
      nodeCode: "DFNP00083",
      nodes: [
        {
          code: "DFNC00004",
          name: "Trong nước",
          type: FormulaNodeTypeEnum.CONDITION,
          enumValue: ShippingExpenseEnum.DOMESTIC,
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNC00005",
          name: "Ngoài nước",
          type: FormulaNodeTypeEnum.CONDITION,
          enumValue: ShippingExpenseEnum.ABROAD,
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNC00006",
          name: "Khác",
          type: FormulaNodeTypeEnum.CONDITION,
          enumValue: ShippingExpenseEnum.OTHER,
          display: DISPLAY_ENUM.SHOW,
        },
      ],
    },
    {
      code: "GR0003",
      name: "Parammeters",
      type: NodeGroupTypeEnum.PARAM,
      display: DISPLAY_ENUM.SHOW,
      nodes: [
        {
          code: "DFNP00001",
          name: "Đơn giá nhập hàng/kg",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNP00002",
          name: "Đơn giá NVL thực hiện/kg",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNP00003",
          name: "Trọng lượng LKPT TANMO tiêu chuẩn/g",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNP00004",
          name: "Tỷ lệ phụ phí nội địa VN",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        // {
        //   code: 'DFNP00005',
        //   name: 'Tỉ lệ phí vận chuyển nước ngoài thiết định',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        {
          code: "DFNP00006",
          name: "Tỉ lệ phí vận chuyển trong nước thực tế",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        // {
        //   code: 'DFNP00007',
        //   name: 'Tỉ lệ phí vận chuyển nước ngoài thực tế',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        // {
        //   code: 'DFNP00008',
        //   name: 'Giờ công net thiết định',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        // {
        //   code: 'DFNP00009',
        //   name: 'Giờ công net thực tế',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        {
          code: "DFNP00010",
          name: "Thời gian chạy máy",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        // {
        //   code: 'DFNP00011',
        //   name: 'Giờ chạy máy thực tế',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        {
          code: "DFNP00012",
          name: "Số máy 1 người đảm trách (số máy chờ)",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        // {
        //   code: 'DFNP00013',
        //   name: 'SL hàng Good',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        // {
        //   code: 'DFNP00014',
        //   name: 'SL hàng NG',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        {
          code: "DFNP00015",
          name: "Lương cơ bản của Việt Nam theo hệ số báo giá",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        // {
        //   code: 'DFNP00016',
        //   name: 'Phí nhân công gián tiếp thiết định',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        {
          code: "DFNP00017",
          name: "Lương cơ bản dùng để tính cost thực tế",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        // {
        //   code: 'DFNP00018',
        //   name: 'Phí nhân công gián tiếp thực tế',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        // {
        //   code: 'DFNP00019',
        //   name: 'Hệ số hiệu chỉnh của bên logistic NVL',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        // {
        //   code: 'DFNP00020',
        //   name: 'Phí nhân công bộ phận xuất kho logistic',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        // {
        //   code: 'DFNP00021',
        //   name: 'Tỷ lệ phí nhân công gián tiếp của VN theo hệ số báo giá',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        {
          code: "DFNP00022",
          name: "Cycle time thiết định (Hr)",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNP00023",
          name: "Cycle time thực tế",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        // {
        //   code: 'DFNP00024',
        //   name: 'Chi phí tiêu hủy và bán các vật có giá trị hàng năm của từng cost center',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        // {
        //   code: 'DFNP00025',
        //   name: 'Thời gian chạy máy ước tính hàng năm của từng cost center',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        // {
        //   code: 'DFNP00026',
        //   name: 'Thời gian chạy máy thực tế hàng năm của từng cost center',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        // {
        //   code: 'DFNP00027',
        //   name: 'Phí dao',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        // {
        //   code: 'DFNP00028',
        //   name: 'Phí điện ga',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        {
          code: "DFNP00029",
          name: "Số lượng ca",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNP00030",
          name: "Tỷ lệ sử dụng thiết bị thiết định",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        // {
        //   code: 'DFNP00031',
        //   name: 'Số lượng chuyền',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        {
          code: "DFNP00032",
          name: "Số tiền get thiết bị của từng mã máy",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNP00033",
          name: "Số năm khấu hao theo các hệ số estimate",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNP00034",
          name: "Lãi suất theo các hệ số estimate",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNP00035",
          name: "Bình quân Thời gian sử dụng máy thực tế/tháng",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        // {
        //   code: 'DFNP00036',
        //   name: 'Thời gian sử dụng thiết bị thực tế (của sản phẩm SX cần tính toán)',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        // {
        //   code: 'DFNP00037',
        //   name: 'Số lượng SX/bình quân tháng (của sản phẩm SX cần tính toán)',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        {
          code: "DFNP00038",
          name: "Bình quân Số lượng sản xuất thiết định của từng mã máy/tháng",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNP00039",
          name: "Bình quân Số lượng sản xuất của từng mã máy/tháng",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNP00040",
          name: "Tổng số tiền get khuôn của sản phẩm (Nguyên giá trung bình của khuôn)",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNP00041",
          name: "Số năm khấu hao khuôn theo kế hoạch",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNP00042",
          name: "Số tiền get khuôn (Nguyên giá)",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNP00043",
          name: "Shot tuổi thọ khuôn/ 1 khuôn (Số shot)",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNP00044",
          name: "Số lượng lấy/ 1shot (Cavity)",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        // {
        //   code: 'DFNP00045',
        //   name: 'Số lượng sản xuất ước tính hàng năm theo estimate',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        // {
        //   code: 'DFNP00046',
        //   name: 'Số lượng sản xuất theo kế hoạch/ 1tháng',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        {
          code: "DFNP00047",
          name: "Bình quân Số lượng sản xuất của từng mã khuôn/tháng",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        // {
        //   code: 'DFNP00048',
        //   name: 'Tỷ lệ phí dao/vật tư tiêu hao trong năm tài chính của từng cost center',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        // {
        //   code: 'DFNP00049',
        //   name: 'Tỷ lệ khấu hao nhà đất và chi phí khấu hao khác hàng năm',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        // {
        //   code: 'DFNP00050',
        //   name: 'Tỷ lệ kinh phí gián tiếp nhà đất khác năm tài chính',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        // {
        //   code: 'DFNP00051',
        //   name: 'Khoản dự toán chi phí gián tiếp khác của từng cost center',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        // {
        //   code: 'DFNP00052',
        //   name: 'Tỷ lệ chi phí gián tiếp khác trong năm tài chính',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        // {
        //   code: 'DFNP00053',
        //   name: 'Tỷ lệ kinh phí gián tiếp của Hệ số báo giá',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        // {
        //   code: 'DFNP00054',
        //   name: 'Khoản dự toán chi phí bán hàng, chi phí quản lý chung theo năm tài chính',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        // {
        //   code: 'DFNP00055',
        //   name: 'Khoản dự toán theo niên độ cho các khoản phí không bao gốm phí nguyên vật liệu và phụ phí',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        // {
        //   code: 'DFNP00056',
        //   name: 'Khoản thực tế chi phí bán hàng, chi phí quản lý chung theo năm tài chính',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        // {
        //   code: 'DFNP00057',
        //   name: 'Khoản thực tế theo niên độ cho các khoản phí không bao gốm phí nguyên vật liệu và phụ phí',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        {
          code: "DFNP00058",
          name: "Phân loại thu mua",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNP00059",
          name: "Loss rate TANMO tiêu chuẩn",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        // {
        //   code: 'DFNP00060',
        //   name: 'Đơn giá hợp đồng của phí gia công thuê ngoài',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        {
          code: "DFNP00061",
          name: "Lắp ráp: Giá trị tại cột [Thao tác tay/手扱い]",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNP00062",
          name: "Gia công: [Giá trị tại cột Thời gian máy chạy/マシンタイム] ",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNP00063",
          name: "Thời gian không có người đứng máy",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        // {
        //   code: 'DFNP00064',
        //   name: 'SL máy',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        // {
        //   code: 'DFNP00065',
        //   name: 'Tỷ lệ phí BP phụ trách cho phần phí khấu hao thiết bị dùng chung khi thiết định',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        {
          code: "DFNP00066",
          name: "Bình quân Số lượng sản xuất thiết định của từng mã máy/tháng",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNP00068",
          name: "Tỷ lệ Phí NG năm tài chính",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNP00069",
          name: "NG rate tiêu chuẩn",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNP00070",
          name: "Lượng tiêu thụ NET (正味消費量) ",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNP00071",
          name: "Loss rate TANMO thực hiện",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNP00072",
          name: "Giờ công làm việc trực tiếp trong daily report/pcs",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNP00073",
          name: "SLSX thực tế",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNP00074",
          name: "Lương cơ bản dùng để tính chi phí thực tế",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        // {
        //   code: 'DFNP00075',
        //   name: 'Tỷ lệ phí BP phụ trách cho phần phí khấu hao thiết bị dùng chung',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        // {
        //   code: 'DFNP00076',
        //   name: 'Số tiền vật liệu đóng gói cho mỗi cost center',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        // {
        //   code: 'DFNP00077',
        //   name: 'Tỷ lệ phí quản lý tiêu chuẩn',
        //   type: FormulaNodeTypeEnum.PARAM,
        //   display: DISPLAY_ENUM.SHOW,
        // },
        {
          code: "DEFAULT_STR",
          name: "Default String",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNP00078",
          name: "CostCenter",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNP00079",
          name: "Trọng lượng LKPT TANMO thực hiện/g",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNP00080",
          name: "Số giờ công NET thiết định",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNP00081",
          name: "SL máy",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNP00082",
          name: "Hiệu suất thiết định",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNP00083",
          name: "Chi phí vận chuyển",
          type: FormulaNodeTypeEnum.PARAM,
          display: DISPLAY_ENUM.SHOW,
        },
      ],
    },
    {
      code: "GR0004",
      name: "Combine node leafs",
      type: NodeGroupTypeEnum.COMBINE,
      display: DISPLAY_ENUM.HIDDEN,
      nodes: [
        {
          code: "COMBINE00001",
          name: "Phí NVL, phí LKPT tiêu chuẩn",
          type: FormulaNodeTypeEnum.COMBINE,
          expression:
            "DFNP00058 == DFNC00007 ? ((DFNP00001 * DFNP00003) / 1000) : (DFNP00058 == DFNC00008 | DFNP00058 == DFNC00009 | DFNP00058 == DFNC00010) ? DFNP00002 : 0",
          display: DISPLAY_ENUM.SHOW,
          costType: CostTypeEnum.STANDARD,
        },
        {
          code: "COMBINE00002",
          name: "Phí NVL, phí LKPT thực hiện",
          type: FormulaNodeTypeEnum.COMBINE,
          expression:
            "DFNP00058 == DFNC00007 ? ((DFNP00002 * DFNP00079) / 1000) / (1 - DFNP00071) : 0",
          display: DISPLAY_ENUM.SHOW,
          costType: CostTypeEnum.IMPLEMENT,
        },
        {
          code: "COMBINE00003",
          name: "Phụ phí trong nước tiêu chuẩn",
          type: FormulaNodeTypeEnum.COMBINE,
          expression: "COMBINE00001 * DFNP00006",
          display: DISPLAY_ENUM.SHOW,
          costType: CostTypeEnum.STANDARD,
        },
        {
          code: "COMBINE00004",
          name: "Phụ phí trong nước thực hiện",
          type: FormulaNodeTypeEnum.COMBINE,
          expression: "COMBINE00002 * DFNP00006",
          display: DISPLAY_ENUM.SHOW,
          costType: CostTypeEnum.IMPLEMENT,
        },
        // {
        //   code: 'COMBINE00005',
        //   name: 'Phân loại trong/ngoài nước',
        //   type: FormulaNodeTypeEnum.COMBINE,
        //   expression:
        //     '(DFNP00058 == "02" | DFNP00058 == "05") ? 0 : (DFNP00058 == "03" | DFNP00058 == "04") ? 1 : DEFAULT_STR',
        //   display: DISPLAY_ENUM.SHOW,
        // },
        {
          code: "COMBINE00006",
          name: "Phí nhân công trực tiếp tiêu chuẩn",
          type: FormulaNodeTypeEnum.COMBINE,
          expression:
            "DFNP00058 == DFNC00007 ? (DFNP00080 * DFNP00015) : DEFAULT_STR",
          display: DISPLAY_ENUM.SHOW,
          costType: CostTypeEnum.STANDARD,
        },
        {
          code: "COMBINE00007",
          name: "Phí nhân công trực tiếp thực hiện",
          type: FormulaNodeTypeEnum.COMBINE,
          expression:
            "DFNP00058 == DFNC00007 ? (DFNP00072 * DFNP00074) : DEFAULT_STR",
          display: DISPLAY_ENUM.SHOW,
          costType: CostTypeEnum.IMPLEMENT,
        },
        {
          code: "COMBINE00008",
          name: "Phí nhân công trực tiếp đi kèm tiêu chuẩn",
          type: FormulaNodeTypeEnum.COMBINE,
          expression:
            "DFNP00058 == DFNC00007 ? (COMBINE00006 * EXP000001) : DEFAULT_STR",
          display: DISPLAY_ENUM.SHOW,
          costType: CostTypeEnum.STANDARD,
        },
        {
          code: "COMBINE00009",
          name: "Phí nhân công trực tiếp đi kèm thực hiện",
          type: FormulaNodeTypeEnum.COMBINE,
          expression:
            "DFNP00058 == DFNC00007 ? (COMBINE00007 * EXP000001) : DEFAULT_STR",
          display: DISPLAY_ENUM.SHOW,
          costType: CostTypeEnum.IMPLEMENT,
        },
        {
          code: "COMBINE00010",
          name: "Phí khấu hao thiết bị tiêu chuẩn",
          type: FormulaNodeTypeEnum.COMBINE,
          expression:
            "DFNP00058 == DFNC00007 ? ((DFNP00032 * (1 + (DFNP00033 * DFNP00034)) / DFNP00033) / 12 / DFNP00081 / DFNP00035) * DFNP00022 / DFNP00082 : DEFAULT_STR",
          display: DISPLAY_ENUM.SHOW,
          costType: CostTypeEnum.STANDARD,
        },
        {
          code: "COMBINE00011",
          name: "Phí khấu hao thiết bị thực hiện",
          type: FormulaNodeTypeEnum.COMBINE,
          expression:
            "DFNP00058 == DFNC00007 ? (DFNP00032 * (1 + DFNP00032 * DFNP00034) / (DFNP00032 * DFNP00081 * 12 * DFNP00035 * DFNP00082 * DFNP00081)) * DFNP00023 : DEFAULT_STR",
          display: DISPLAY_ENUM.SHOW,
          costType: CostTypeEnum.IMPLEMENT,
        },
        {
          code: "COMBINE00012",
          name: "Phí khấu hao khuôn tiêu chuẩn",
          type: FormulaNodeTypeEnum.COMBINE,
          expression:
            "DFNP00058 == DFNC00007 ? DFNP00040 / (DFNP00038 * 12 * DFNP00041) : DEFAULT_STR",
          display: DISPLAY_ENUM.SHOW,
          costType: CostTypeEnum.STANDARD,
        },
        {
          code: "COMBINE00013",
          name: "Phí khấu hao khuôn thực hiện",
          type: FormulaNodeTypeEnum.COMBINE,
          expression:
            "DFNP00058 == DFNC00007 ? DFNP00040 / (DFNP00047 * 12 * DFNP00041) : DEFAULT_STR",
          display: DISPLAY_ENUM.SHOW,
          costType: CostTypeEnum.IMPLEMENT,
        },
      ],
    },
    {
      code: "GR0005",
      name: "Phí NVL / LKPT",
      type: NodeGroupTypeEnum.DEFAULT,
      display: DISPLAY_ENUM.SHOW,
      nodes: [],
    },
    {
      code: "GR0006",
      name: "Setting charge cho từng khoản chi",
      type: NodeGroupTypeEnum.DEFAULT,
      display: DISPLAY_ENUM.SHOW,
      nodes: [],
    },
    {
      code: "GR0007",
      name: "Lý lịch thiết bị",
      type: NodeGroupTypeEnum.DEFAULT,
      display: DISPLAY_ENUM.SHOW,
      nodes: [],
    },
    {
      code: "GR0008",
      name: "Lý lịch Khuôn",
      type: NodeGroupTypeEnum.DEFAULT,
      display: DISPLAY_ENUM.SHOW,
      nodes: [],
    },
    {
      code: "GR0009",
      name: "Số liệu cơ bản hằng năm",
      type: NodeGroupTypeEnum.DEFAULT,
      display: DISPLAY_ENUM.SHOW,
      nodes: [],
    },
    {
      code: "GR0010",
      name: "Thông tin công đoạn",
      type: NodeGroupTypeEnum.DEFAULT,
      display: DISPLAY_ENUM.SHOW,
      nodes: [],
    },
    {
      code: "GR0011",
      name: "Phí gia công",
      type: NodeGroupTypeEnum.DEFAULT,
      display: DISPLAY_ENUM.SHOW,
      nodes: [],
    },
    {
      code: "GR0012",
      name: "Phân loại thu mua",
      type: NodeGroupTypeEnum.CONDITION,
      display: DISPLAY_ENUM.SHOW,
      nodeCode: "DFNP00058",
      nodes: [
        {
          code: "DFNC00007",
          name: "Nội chế ở nhà máy VN",
          type: FormulaNodeTypeEnum.CONDITION,
          enumValue: "01",
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNC00008",
          name: "Mua nội địa VN",
          type: FormulaNodeTypeEnum.CONDITION,
          enumValue: "02",
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNC00009",
          name: "Mua từ Nhật",
          type: FormulaNodeTypeEnum.CONDITION,
          enumValue: "03",
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNC00010",
          name: "Mua từ nước ngoài",
          type: FormulaNodeTypeEnum.CONDITION,
          enumValue: "04",
          display: DISPLAY_ENUM.SHOW,
        },
        {
          code: "DFNC00011",
          name: "Hàng gia công ngoài",
          type: FormulaNodeTypeEnum.CONDITION,
          enumValue: "05",
          display: DISPLAY_ENUM.SHOW,
        },
      ],
    },
  ];

  const data = [];
  for (const element of arr) {
    const { nodes } = element;
    for (const node of nodes) {
      data.push({
        Code: node.code,
        Name: node.name,
      });
    }
  }

  const formattedData = jsonData.map((entry) => ({
    Code: entry.code || "",
    Name: entry.name || "",
  }));

  // Create a new worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

  // Write the workbook to a file
  XLSX.writeFile(workbook, fileName);

  console.log(`Excel file "${fileName}" has been created successfully.`);
}

// Example usage
const exampleData = [
  { code: "A123", name: "Product A" },
  { code: "B456", name: "Product B" },
  { code: "C789", name: "Product C" },
];

jsonToExcel(exampleData, "Output.xlsx");
