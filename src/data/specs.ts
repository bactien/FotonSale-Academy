import { TruckSpec, SalesStep } from '../types';

export const fotonSpecs: TruckSpec[] = [
  {
    id: 'wonder',
    name: 'Foton Wonder',
    title: 'Vua tải nhẹ thành thị',
    segment: 'Tải Nhẹ (LDT)',
    powerType: 'Xăng',
    engine: 'DAM16NS (Thế hệ mới nhất của DAM)',
    capacity: '1.599 cc',
    power: '118 HP (88 kW)',
    torque: '152 Nm / 4.400 rpm',
    gearbox: 'Cơ khí (5 tiến + 1 lùi), Hiệu suất truyền lực 95%',
    chassis: 'Thép dập cường độ cao dầy dặn',
    suspension: 'Treo phụ thuộc, cầu sau nhíp gánh chịu tải thiết kế 1.7 tấn',
    safety: 'Phanh đĩa trước/Tang trống sau, Chống bó cứng phanh ABS/EBD, Cảm biến mòn má phanh tiện ích',
    comfort: 'Màn hình giải trí 9.0 inch tích hợp camera lùi, Đèn pha bật/tắt tự động, Phím âm thanh trên vô lăng, Bơm lưng ghế lái',
    payload: '990 kg',
    dimension: '2.800 x 1.670 x 400 mm (Kích cỡ vàng di dời)',
    warranty: '36 tháng hoặc 100.000 km',
    strengths: [
      'Động cơ DAM bốc khỏe hàng đầu phân khúc dưới 1T',
      'Đầy rẫy công nghệ xe con: Cruise vô lăng, Auto đèn pha, màn hình 9 inch siêu to',
      'Cầu sau nhíp gánh cõng hàng 1.7 tấn kiên cố bậc nhất'
    ],
    weaknesses: [
      {
        con: 'Yêu cầu nhiên liệu xăng chuẩn, tốn lọc',
        conResponse: 'Động cơ hiện đại nén cao cần xăng chuẩn từ RON 95 trở lên giúp máy bốc, mượt mà và tránh cặn carbon đầu phun.'
      },
      {
        con: 'Không có phiên bản thùng dài 3.2m',
        conResponse: 'Sản phẩm tập trung tối ưu chiều dài 2.8m để bán kính xoay nhỏ, dễ quay đầu vượt phố hẹp miền Bắc. Nhà máy dự kiến bổ sung dòng dài trong lộ trình sắp tới.'
      }
    ],
    competitors: 'Thaco TF230 (122HP), Teraco Tera 100S (CN Mitsubishi 92HP), Dothanh Missu T26 (122HP)'
  },
  {
    id: 'aumark-x25',
    name: 'Aumark X25 & X25L',
    title: 'Chuẩn mực tải nhẹ ven đô',
    segment: 'Tải Nhẹ (LDT)',
    powerType: 'Dầu',
    engine: 'Aucan 4F25 (Động cơ liên doanh Anh Quốc tinh tế)',
    capacity: '2.499 cc',
    power: '130 HP (96 kW)',
    torque: '320 Nm / dải dầy 1.000 - 2.800 rpm',
    gearbox: 'Trang bị hộp số liên doanh ZF cao cấp (5 tiến + 1 lùi)',
    chassis: 'Khung thép 610L đúc nguyên khối dày 4.0 mm chịu tải xuất sắc',
    suspension: 'Nhíp lá hai tầng dẻo dai (cấu hình 3/3+1)',
    safety: 'Phanh đĩa trước, tang trống sau tích hợp ABS/EBD cao cấp, Cảm biến chạm mòn phanh',
    comfort: 'Hệ thống ga tự động Cruise Control, Đèn pha bật/tắt tự động thông minh, Vô lăng gật gù đa phím bấm',
    payload: '1.990 kg (X25) & 2.490 kg (X25L)',
    dimension: '3.750 x 1.840 x 1.950 mm (X25) / 4.350 x 1.840 x 1.950 mm (X25L)',
    warranty: '36 tháng hoặc 100.000 km',
    strengths: [
      'Gia tốc mô-men 320Nm đạt cực sớm ngay từ 1.000 rpm giúp cõng tải đề pa nhàn tênh',
      'Đồng bộ động cơ Aucan và Hộp số ZF danh tiếng của Đức',
      'Cruise Control độc nhất phân khúc 1.9T giúp chạy cao tốc rảnh chân'
    ],
    weaknesses: [
      {
        con: 'Chỉ thiết kế cabin 2 chỗ ngồi',
        conResponse: 'Hãng ưu tiên ghế độc lập cỡ rộng tiêu chuẩn châu Âu để tài xế được ngồi riêng tư, rộng lách, dễ ra vào số và bảo vệ an toàn tối đa cho cột sống góc lái.'
      },
      {
        con: 'Gương chiếu hậu tay đòn nhìn rườm rà',
        conResponse: 'Gương tay đòn nhô xa giúp triệt tiêu góc chết dọc sườn sườn đuôi thùng gầm cao, và là "bệ thước đo căn": Gương lách lọt ngõ hẹp là chắc chắn xe trôi qua an toàn.'
      }
    ],
    competitors: 'Kia K250 (động cơ D4CB 130HP, hộp số 6 cấp), Dothanh IZ50S, JAC N200S Pro'
  },
  {
    id: 'aumark-s35',
    name: 'Aumark S35',
    title: 'Mạnh mẽ nhất phân khúc 3.5 Tấn',
    segment: 'Tải Nhẹ (LDT)',
    powerType: 'Dầu',
    engine: 'Aucan 4F25TC6 thế hệ đỉnh cao',
    capacity: '2.499 cc',
    power: '158 HP (116 kW) - Top 1 phân khúc',
    torque: '400 Nm ở dải phẳng 1.300 - 2.700 rpm',
    gearbox: 'Hộp số ZF 5S408 châu Âu, chuyển số êm mượt, truyền lực 95%',
    chassis: 'Khung dầm cường độ cao mác thép 750L dày 4.5 mm, tự trọng xe nhẹ nhất phân khúc 2.200 kg',
    suspension: 'Nhíp lá cường độ cao (cấu hình 3/5+2), Cầu sau gánh tải chuẩn 5.200 kg',
    safety: 'Phanh đĩa trước, ABS 4 kênh độc lập, phanh khí xả tự dội bổ, tự chỉnh khe hở phanh',
    comfort: 'Ghế ngồi gập phẳng tạo giường nằm mát, Ga tự động Cruise, Đèn pha tự động, Điều hòa lạnh âm cực sâu <30 giây',
    payload: '3.495 kg (Phù hợp lái bằng mới)',
    dimension: '4.400 x 1.995 x 2.100 mm',
    warranty: '60 tháng hoặc 200.000 km (Cam kết Vàng 1 đổi 1 Block Engine)',
    strengths: [
      'Công suất 158 mã lực mạnh vô đối, thổi bay mọi đồi dốc dải dốc Cao Bắc Lạng',
      'Đại lý cam kết chương trình Vàng: Trực tiếp Đổi mới Thân động cơ (Block) nếu lỗi',
      'Dàn phanh đĩa trước kèm ABS 4 kênh và khí xả cực an toàn đổ đèo dốc dài'
    ],
    weaknesses: [
      {
        con: 'Thương hiệu động cơ Aucan còn mới lạ',
        conResponse: 'Aucan là dòng máy quốc dân đạt doanh số triệu con tại Trung Quốc, xuất dã chiến sang 40 nước châu Âu và liên kết công nghệ Anh Quốc.'
      },
      {
        con: 'Không có phiên bản thùng dài 6.3m trong catalog hiện tại',
        conResponse: 'Nhà máy đang gấp rút đưa phiên bản S35-SL thùng sườn 6.3m về đại lý miền Bắc trong cuối năm nay với tổng tải dưới 7.5T.'
      }
    ],
    competitors: 'Thaco Linker T2 6.5 (động cơ Weichai 140HP), JAC N350S (Cummins 150HP), Dothanh IZ65M Plus'
  },
  {
    id: 'aumark-s50',
    name: 'Aumark S50',
    title: 'Chiến thần cõng tải 5 Tấn dã chiến',
    segment: 'Tải Trung (MDT)',
    powerType: 'Dầu',
    engine: 'Cummins ISF3.8s5154 dã dã thương hiệu Mỹ',
    capacity: '3.760 cc',
    power: '155 HP (115 kW)',
    torque: '500 Nm dải lực đều từ 1.200 - 1.900 rpm',
    gearbox: 'Hộp số ZF 6S600 Đức với 6 cấp linh hoạt, hiệu suất sườn cầu sau 95%',
    chassis: 'Khung chassis dầm dạng chữ H dập nguội, thép mác 510L dày dặn tới 5.0 mm',
    suspension: 'Hệ treo nhíp lá chịu cày dập cường độ cao (cấu hình 3/7+6 dã dã)',
    safety: 'Phanh hơi khí nén lốc kê toàn phần, phanh ABS 4 kênh, hệ thống chống trượt chủ động ASR và hỗ trợ dốc HSA',
    comfort: 'Khoang lái rộng lộng gió, Cruise ga tự động, Đèn pha Auto, Giường nằm đơn êm rơ sau tựa ghế gập',
    payload: '4.995 kg',
    dimension: '5.250 x 2.200 x 2.155 mm',
    warranty: '60 tháng hoặc 200.000 km',
    strengths: [
      'Máy Cummins 3.8 lít danh tiếng của Mỹ cực kỳ trâu bò bướng bỉnh chịu tải',
      'Hộp số ZF 6 cấp châu Âu dập rơ mượt mà, chuyển dải thông thoáng',
      'Phanh hơi lốc kê kèm hàng tá công nghệ chống trượt dốc chuyên trị Tây Bắc'
    ],
    weaknesses: [
      {
        con: 'Giá xe định vị cao hơn xe nội địa giá rẻ',
        conResponse: 'Sức mạnh Cummins Mỹ, hộp số danh giá ZF Đức cùng dàn phanh lốc kê đem lại độ bền bỉ gấp 3 lần xe cỏ, bảo toàn vốn giữ giá khi sang nhượng.'
      }
    ],
    competitors: 'Hyundai Mighty W11S (170HP máy cơ hao dầu), JAC N500 (máy DEV 155HP), Dothanh IZ500L'
  },
  {
    id: 'aumark-s70',
    name: 'Aumark S70',
    title: 'Giải pháp gánh tải 6.5T linh hoạt gọn gàng',
    segment: 'Tải Trung (MDT)',
    powerType: 'Dầu',
    engine: 'Cummins ISF3.8s5154 sành điệu thương hiệu Mỹ',
    capacity: '3.760 cc',
    power: '154 HP (115 kW) @ 2.600 rpm',
    torque: '500 Nm tại tua máy cực sớm 1.200 - 1.900 rpm',
    gearbox: 'Hộp số cơ khí ZF 6 cấp (6S500) truyền động hiệu năng 95%',
    chassis: 'Khung dầm chữ H dập nguội nguyên khối, mác thép cường độ cao dày 6.0 mm',
    suspension: 'Hệ treo nhíp lá hai tầng dẻo dai chống xoắn vặn',
    safety: 'Phanh hơi lốc kê toàn phần khí nén, tích hợp hệ thống kiểm soát chống bó cứng ABS',
    comfort: 'Cabin rộng rãi êm ái, ga rảnh tay Cruise Control, điều hoà làm lạnh buốt <30 giây, mặt gương sưởi điện',
    payload: '6.500 kg',
    dimension: '5.200 x 2.150 x 2.220 mm (Gọn gàng ngõ hẹp đô thị)',
    warranty: '36 tháng hoặc 100.000 km',
    strengths: [
      'Động cơ Cummins ISF3.8 Mỹ gánh tải cực lì lợm và tì kéo đèo dốc bền bỉ',
      'Kích thước gọn gàng hơn bản S70L giúp xe lọt qua các tuyến ngõ nhỏ ven hồ, chợ tấp nập dễ xoay trở',
      'Đồng bộ hộp số danh tiếng ZF Đức tiết kiệm nhiên liệu dải dài'
    ],
    weaknesses: [
      {
        con: 'Thùng ngắn 5.2m không chở được sắt thép dài 6m nguyên cây',
        conResponse: 'Foton thiết kế riêng dòng này cho hàng khối lượng riêng lớn như cát đá xi măng đóng bao, trái cây tải cao gọn ngõ hẹp. Bác tài chở cây sắt dài đã có giải pháp nâng hạng lên dòng Aumark S70L dài 6.3m.'
      }
    ],
    competitors: 'Hyundai Mighty 110SP (động cơ D4GA 150HP), JAC N650 (máy Weichai 143HP)'
  },
  {
    id: 'aumark-s70l',
    name: 'Aumark S70L',
    title: 'Vua hạ pallet 7.5T chuyên nghiệp',
    segment: 'Tải Trung (MDT)',
    powerType: 'Dầu',
    engine: 'Cummins ISF3.8s5168 dũng mãnh dã chiến',
    capacity: '3.760 cc',
    power: '168 HP (125 kW) @ 2.600 rpm',
    torque: '500 Nm dải lực phẳng dầy 1.300 - 1.700 rpm',
    gearbox: 'Hộp số cơ khí ZF 6S600 Đức rơ ngọt 6 cấp',
    chassis: 'Chassis dầm xoắn thép mác 700L dập nguội kẹp kép chịu tải trọng đỉnh cao dày 6.0 mm',
    suspension: 'Nhíp lá cường độ cao có nhíp phụ gánh tấn kiên cố sườn cầu',
    safety: 'Phanh khí nén hơi lốc kê toàn phần phối hợp ABS và điều chỉnh lực phanh tự động',
    comfort: 'Cabin rộng rãi hiện đại, ga tự động Cruise rảnh chân, kính sấy sấy gương đa phương tiện, vô lăng gật gù gập phẳng tạo giường nằm mát',
    payload: '7.450 kg (Tối ưu hóa cước Logistics)',
    dimension: '6.300 x 2.250 x 2.150 mm (Xếp gọn gàng 6 Pallet tiêu chuẩn gỗ)',
    warranty: '60 tháng hoặc 200.000 km',
    strengths: [
      'Lòng thùng tối ưu dài tới 6.3m vừa khít 6 pallet hàng tiêu chuẩn trong chuỗi logistics liên tỉnh',
      'Mã lực dũng mãnh 168 HP khoẻ bứt tốc vượt đèo dốc dột sườn dẻo dai',
      'Chính sách bảo hành vàng 5 năm cự tuyệt lo lắng bảo dưỡng dọc đường'
    ],
    weaknesses: [
      {
        con: 'Bán kính quay xe lớn hơn bản S70 thông thường',
        conResponse: 'Dòng xe hướng tới vận tải trung chuyển đường trường, quốc lộ liên vùng. Việc đánh đổi bán kính quay lấy lòng thùng 6.3m mang lại hiệu năng sinh cước cao gấp rưỡi cho chủ xe.'
      }
    ],
    competitors: 'JAC N650 Plus (máy Cummins Mỹ 3.8L 170HP), Thaco Ollin S720 (máy Yuchai 132HP)'
  },
  {
    id: 'aumark-s90',
    name: 'Aumark S90',
    title: 'Vua đường trường - Thống lĩnh lòng thùng 7.4m',
    segment: 'Tải Trung (MDT)',
    powerType: 'Dầu',
    engine: 'Cummins ISF3.8s5168 khỏe khoắn',
    capacity: '3.760 cc',
    power: '168 HP (125 kW)',
    torque: '500 Nm duy trì ở tua 1.300 - 1.700 rpm',
    gearbox: 'Hộp số ZF 6S600 châu Âu bứt tốc mượt, giải lực thông thoáng',
    chassis: 'Thép cường độ siêu cao 700L dày 6mm chịu vặn xoắn đỉnh cao',
    suspension: 'Hệ treo nhíp lá chịu dập dã dã tốt (cấu hình nhíp dày nhích)',
    safety: 'Phanh lốc kê toàn phần phối hợp ABS + ASR + hỗ trợ lùi khởi hành dốc HSA',
    comfort: 'Thùng dầu 260 lít nhôm tản nhiệt, cabin máy lạnh buốt, Cruise ga rảnh cao tốc',
    payload: '9.200 kg (Tự trọng nhẹ nhất phân khúc 4.120 kg, nhẹ hơn đối thủ 200kg)',
    dimension: '7.400 x 2.300 x 2.420 mm (chở gọn gàng 6 Pallet tiêu chuẩn gỗ)',
    warranty: '60 tháng hoặc 200.000 km',
    strengths: [
      'Chiều dài sườn thùng 7.4m vượt đối thủ JAC N900 tới 400mm xếp gọn 6 pallet',
      'Tự trọng xe nhẹ vượt trội cõng thêm hàng tấn nông sản đi biên giới',
      'Tiết kiệm chi phí nhiên liệu nhờ động cơ Cummins dải chuẩn chỉ và hộp số ZF Đức'
    ],
    weaknesses: [
      {
        con: 'Động cơ Cummins 3.8L yếu công suất hơn động cơ 4.5L của đối thủ JAC N900',
        conResponse: 'Động cơ Cummins 3.8L kết hợp với hộp số ZF cao cấp giúp xe cõng tải định mức vô cùng tiết kiệm dầu dải dài, tránh hao phí vòi phun xăng dầu dư thừa so với cỗ máy 4.5L quá khổ tốn kém.'
      }
    ],
    competitors: 'JAC N900 Plus, Chenglong M3'
  }
];

export const sales9MOTs: SalesStep[] = [
  {
    step: 1,
    name: 'Nhận thức (Awareness) - Tìm kiếm cơ hội',
    objective: 'Nhận diện tệp khách tiềm năng, phác họa sơ bộ chân dung khách hàng, thiết lập lịch hẹn gieo duyên đến showroom.',
    customerExpectation: 'Nhận biết được uy tín thương hiệu Foton và sự nhiệt thành từ lời nói đầu tiên của TVBH.',
    expertTips: [
      'Áp dụng chiến thuật 6G + 1D (Gieo - Ghé - Gửi - Gọi - Gặp - Giá - Deal) kỷ luật hằng tuần.',
      'Sử dụng nguyên tắc Telesales cốt lõi: Điện thoại là để cài Đặt hẹn gặp mặt chứ KHÔNG phải để kỳ kèo báo giá từ xa.',
      'Warm call thay vì Cold call: Tìm một cái cớ đắt giá (Chương trình hỗ trợ đợt lái thử lớn, tài liệu so sánh đối thủ quý hiếm, ưu đãi thuế).'
    ],
    mistakes: [
      'Sai lầm dông dài lan man, vồ vập băm bổ báo giá ngay qua điện thoại làm mất đi cái cớ gặp trực tiếp.',
      'Mua data rác nhắm bừa bãi không phân loại đúng nhu cầu B2B hoặc B2C dính nợ xấu ngân hàng.'
    ]
  },
  {
    step: 2,
    name: 'Gặp mặt (Greeting) - Tiếp đón chuẩn vàng',
    objective: 'Tạo ấn tượng chuyên nghiệp độc tôn ngay từ 5 giây chạm trán đầu tiên, thiết lập thiện cảm gia tăng kết nối.',
    customerExpectation: 'Đón tiếp tôn trọng, đàng hoàng lịch sự, không phán xét năng lượng ví tiền qua vẻ ngoài.',
    expertTips: [
      'Tư thế đứng thẳng lưng, cúi chào nghiêm trang lượn góc 15-30 độ hướng mắt tươi cười đón khách.',
      'Trao danh thiếp chuẩn quy trình: Bằng 2 tay lịch sử, ngón tay tuyệt đối KHÔNG che mờ logo Foton, hướng bề mặt chữ tiếng Việt chỉn chu về tầm mắt khách.',
      'Mời khách vào đúng vị trí showroom đầm ấm có tầm nhìn thông thoáng hướng thẳng ra dòng xe Foton mà KH đang băn khoăn nhòm ngó.'
    ],
    mistakes: [
      'Khoanh tay trước ngực, đút tay túi quần bướng bỉnh xem khinh khách ăn mặc nông dân dản dị.',
      'Quên không dâng nước uống theo danh mục (Menu Đại lý) chỉnh chu khiến khách bơ vơ lạc lõng.'
    ]
  },
  {
    step: 3,
    name: 'Khám phá (Discovery) - Dò tìm nhu cầu & Giới thiệu FAB',
    objective: 'Truy tìm tận cùng Mục đích mua xe, địa hình cày ải thực tế, quy mô nguồn hàng, tình hình tài chính thực sự.',
    customerExpectation: 'Một chuyên gia vận tải chân chính đưa ra giải pháp giải cứu dòng hàng, chứ không phải một cò xe hối hả ép cọc.',
    expertTips: [
      'Lắng nghe theo quy tắc 80/20: Dành 80% thời gian lắng tai ghi chép và đặt câu hỏi mở thăm dò nhu cầu, chỉ nói 20% khi đưa khấc giải pháp.',
      'Ứng dụng tuyệt kỹ giới thiệu xe 7 điểm vòng quanh xe (Ngoại thất cabin -> Động cơ, treo trước -> Chassis dội dầm -> Cầu sau, phanh lốp -> Hậu mãi sau gara -> Bình dầu sườn khí thải -> Tiện nghi lái xe an toàn).',
      'Khớp nối nhu cầu bằng công cụ FAB (Features - Đặc tính; Advantages - Ưu điểm vượt trội; Benefits - Lợi ích rực rỡ mang lại cho KH).'
    ],
    mistakes: [
      'Hối hả xả tràn lan thông số kỹ thuật khô khan rác tai trước khi thấu hiểu được lòng khách chở hàng gì hay lội địa hình dốc đèo nào.'
    ]
  },
  {
    step: 4,
    name: 'Trải nghiệm (Experience) - Lái thử thực tế',
    objective: 'Giúp khách gạt bỏ mọi rào cản e ngại kỹ thuật, trực tiếp cảm thụ chân thực sức bốc, độ đầm êm của xe Foton.',
    customerExpectation: 'Trực tiếp ngồi cầm bẻ bánh lái, cảm nhận rõ máy bốc mượt ga tự động, phanh gài lốc kê an toàn.',
    expertTips: [
      'TVBH phải tuyệt đối kiểm tra giấy phép lái xe (đúng hạng bằng, hạn sử dụng), lái thử xe trước ra bãi trống an toàn rồi mới trao vô lăng cho khách.',
      'Thiết kế cung đường lái thử rành mạch: Nhắc khách tính năng sắp thử (ví dụ: bốc ga tăng tốc kiểm nghiệm turbo, gài Cruise Control giải trí cao tốc).',
      'Dùng Sales-talk bằng các câu hỏi đóng rực sáng ý kiến tích cực sau khi thử (Ví dụ: "Anh chị thấy máy bốc thế rơ đầm hẳn đúng không ạ?").'
    ],
    mistakes: [
      'Gượng gạo không chuẩn bị trước xe sạch bụi, dầu nhiên liệu rơ móp dưới 25% tồi tàn hôi hám khiến khách cụt hứng lái thử.',
      'Sử dụng điện thoại hoặc tranh luận thô thiển ngắt ngang lời tài xế khi họ đang bận bẻ lái qua ngã cua nguy hiểm.'
    ]
  },
  {
    step: 5,
    name: 'Đàm phán (Negotiation) - Thống nhất rực rỡ',
    objective: 'Tìm kiếm điểm cân bằng lợi nhuận đại lý và lợi ích dòng hàng của khách mua bùng nổ cọc.',
    customerExpectation: 'Đạt được mức giá thương lượng vừa miếng dắt ví mang lại may mắn, quà tặng phụ phu kiện rực rỡ.',
    expertTips: [
      'Tạo thiện cảm khi chớm vào bàn đàm phán bằng cách chủ động tặng thêm quà tặng nhỏ độc quyền trước khi khách dội mồm yêu cầu giảm giá sốc.',
      'Chơi bài toán khan hiếm đắt giá: "Chỉ còn độc nhất 1 con rơ xe màu phong thuỷ tốt hợp tuổi anh tại đại lý miền Bắc tuần này".',
      'Đứng trên lập trường giải quyết win-win đôi bên cùng thắng.'
    ],
    mistakes: [
      'Dễ dãi cắt sạch sành sanh hoa hồng hên lợi nhuận của đại lý ngay từ phút đầu, hoặc giữ thế khinh khỉnh kiêu căng làm căng vỡ deal.'
    ]
  },
  {
    step: 6,
    name: 'Thăm lại (Re-visit) - Nuôi dưỡng nối gieo',
    objective: 'Quay lại chăm sóc tiếp cận sát sườn các tệp khách rời đi chưa chốt cọc trong vòng 3 ngày vàng.',
    customerExpectation: 'Vẫn nhận được hào sảng, chăm sóc nồng hậu dẫu cho lúc trước chưa kịp ký hợp đồng.',
    expertTips: [
      'Xúc tiến liên hệ lại trong vòng 3 ngày kể từ lúc khách rời đi showroom bằng phương thức liên hệ quen thuộc nhất.',
      'Tìm hiểu căn kẽ nguyên nhân hoãn mua (Ngân sách hụt, vợ cả gở can ngoặc, băn khoăn xe cỏ mác khác) để đề xuất gói tài chính rơ hẹp vừa tầm.',
      'Luôn do chính TVBH cũ tiếp cận chăm sóc từ đầu để nối mạch thân tình bền chặt.'
    ],
    mistakes: [
      'Giận dỗi bỏ quên bẵng khách hàng bơ vơ khi thấy họ chưa chồng tiền cọc ngay đợt đầu, làm mất trắng 33% cơ hội chốt khứ hồi tái ghé.'
    ]
  },
  {
    step: 7,
    name: 'Quyết định (Decision) - Soạn soạn ký kết',
    objective: 'Đưa cuộc đàm phán cán đích ký hợp đồng vàng đặt cọc trơn tru thanh thoát.',
    customerExpectation: 'Thủ tục chuẩn chỉ, pháp lý rành mạch rõ ràng, chuẩn bị hồ sơ ngân hàng bốc rơ.',
    expertTips: [
      'Soạn hảo hợp đồng cực nhanh không được vượt quá 15 phút vàng khiến lửa hào hứng của khách bị nguôi nguội mát rượi.',
      'Trong lúc chờ thảo hợp đồng, dâng dâng thêm cafe, nước mát cho khách khoan khoái bớt căng thẳng dắt ví.',
      'Bàn giao hồ sơ hợp đồng bằng 2 tay trịnh trọng, hướng mặt chữ khế ký thăng hoa thẳng vào tầm tay khách.'
    ],
    mistakes: [
      'Soạn thảo văn bản rùa rùa chậm chạm kéo dầy cả tiếng, sai lệch lỗi chính tả họ tên dòng xe cọc ngân hàng khiến khách nhụt chí dỗi ra về.'
    ]
  },
  {
    step: 8,
    name: 'Bàn giao (Delivery) - Rực rỡ đón xe mới',
    objective: 'Bàn giao xe trơn tru hào hứng đem lại niềm tự hào sinh lời bùng bùng cho khách hàng vận tải.',
    customerExpectation: 'Buổi lễ bàn giao suôn sực may mắn, chụp ảnh lộng lẫy đăng facebook nở mày nở mặt dòng tộc.',
    expertTips: [
      'Thiết kế chuẩn lễ giao xe (Thời gian dầy dặn 45-60 phút): Trực tiếp Showroom mở khoá giao chìa và sách hướng dẫn cặn kẽ.',
      'Giao chi tiết các dụng cụ lăn xe dự phòng, lốp sơ cua dõng dạc rồi dẫn ra phòng Dịch vụ đại lý giới thiệu làm quen cố vấn kỹ sư bảo dưỡng.',
      'Giám đốc bán hàng tặng lẵng hoa tươi mới đỏ đại cát chụp hình rực rỡ lưu khoảnh khắc vàng.'
    ],
    mistakes: [
      'Giao xe dơ bẩn bám bụi đất, lốp xe xì xì hơi mồi dã dã thiếu hụt dụng cụ kẹp tháo thô thiển để khách phát hiện ra giận dữ mắng dỗi.'
    ]
  },
  {
    step: 9,
    name: 'Chăm sóc (Follow-up Care) - Marketing truyền miệng',
    objective: 'Biến khách mua xe cũ thành "Đại sứ thương hiệu" thầm lặng đem lại 80% doanh thu giới thiệu kế nối sau này.',
    customerExpectation: 'Chăm sóc sau bán đầm ấm, kịp thời giải quyết hư hỏng dọc sườn đèo dốc sơn cước miền Bắc.',
    expertTips: [
      'Bốc máy gọi điện thăm hỏi đúng lúc sau 3 ngày giao xe, 1 tháng xe chạy, và hằng dịp sinh nhật lễ lộc gia đình tài xế.',
      'Chủ động tư vấn rỉ rói lịch trình đến hạn thay dầu tản gốc bảo dưỡng lần đầu.',
      'Gợi mở khôn khéo nhờ bác tài làm cầu nối giới thiệu dàn hàng anh em đồng nghiệp cùng ngành cước bến bãi miền Bắc.'
    ],
    mistakes: [
      'Giao xe xong là phủi tay cướp phăng liên lạc, rũ bỏ trách nhiệm khi xe gặp sự cố hỏng vặt dọc đường làm bẩn đi hình ảnh vàng của hãng.'
    ]
  }
];
