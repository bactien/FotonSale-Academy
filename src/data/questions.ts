import { Question } from '../types';

// The first 20 premium hand-crafted questions
const manualQuestions: Question[] = [
  {
    id: 1,
    category: 'Sản phẩm',
    question: 'Dòng tải nhẹ Foton Wonder dưới 1 tấn sử dụng kiểu động cơ xăng nào và mô-men xoắn đạt giá trị tối đa là bao nhiêu?',
    options: [
      'A. Động cơ CN Mitsubishi, Mô-men cực đại 109 Nm',
      'B. Động cơ DAM16KR, Mô-men cực đại 158 Nm',
      'C. Động cơ DAM16NS, Mô-men cực đại 152 Nm / 4.400 rpm',
      'D. Động cơ Weichai WP2.3, Mô-men cực đại 320 Nm'
    ],
    correct_answer: 'C',
    explanation: 'Foton Wonder được trang bị thế hệ động cơ xăng DAM16NS dung tích 1.599 cc, sản sinh công suất 118 HP (88 kW) và mô-men xoắn cực đại 152 Nm tại vòng tua 4.400 rpm, vượt trội về công năng bứt tốc nội đô so với Teraco Tera 100S dắt dùng động cơ CN Mitsubishi chỉ đạt 92 HP.'
  },
  {
    id: 2,
    category: 'Sản phẩm',
    question: 'Chính sách bảo hành chính hãng đối với dòng xe tải nhẹ đô thị Foton Wonder là bao nhiêu?',
    options: [
      'A. 24 tháng hoặc 50.000 km tùy điều kiện nào đến trước',
      'B. 36 tháng hoặc 100.000 km tùy điều kiện nào đến trước',
      'C. 12 tháng không giới hạn số km',
      'D. 60 tháng hoặc 200.000 km'
    ],
    correct_answer: 'B',
    explanation: 'Foton Wonder được áp dụng chính sách bảo hành chính hãng lên tới 36 tháng hoặc 100.000 km (tùy điều kiện nào đến trước), một cam kết hậu mãi vững bền hàng đầu đối với dòng xe tải nhỏ thành thị.'
  },
  {
    id: 3,
    category: 'Sản phẩm',
    question: 'Khi khách hàng phàn nàn Foton Wonder chỉ có lòng thùng dài 2.8m, ngắn hơn đối thủ có thùng dài 3.2m, một chuyên gia bán hàng Foton thực chiến nên ứng phó thế nào?',
    options: [
      'A. Khuyên khách hàng tự cơi nới hoặc đóng lại thùng xe dài ra 3.2m bên ngoài.',
      'B. Tư vấn khách mua dòng xe Aumark X25L 1.9 tấn nếu muốn thùng dài hơn.',
      'C. Giải thích: Thùng 2.8m là kích thước vàng đã qua thử nghiệm gắt gao nhằm tối ưu hóa sự nhanh nhẹn, giảm bán kính quay vòng để luồn lách dễ vượt ngõ ngách, phố nhỏ miền Bắc; đồng thời hé lộ nhà máy sắp tung ra thêm dòng thùng dài hơn.',
      'D. Thừa nhận đây là nhược điểm chí mạng của hãng và chủ động đề xuất giảm giá sốc.'
    ],
    correct_answer: 'C',
    explanation: 'Tư duy thực chiến: Thùng dài 2.8m là một "vũ khí đặc biệt" tối ưu cho việc di chuyển luồn lách linh hoạt tại ngõ hẹp đô thị miền Bắc. Hãy biến điểm yếu kích thước thành điểm mạnh về sự nhanh nhẹn cơ động, đồng thời gieo lộ trình sản phẩm tương lai để giữ liên kết.'
  },
  {
    id: 4,
    category: 'Sản phẩm',
    question: 'Aumark X25 & X25L (1.9T) sở hữu động cơ Aucan 4F25 đạt mô-men xoắn tối đa 320 Nm tại dải vòng tua rất sớm nào?',
    options: [
      'A. Đạt cực đại tại dải tua từ 2.000 - 3.500 rpm',
      'B. Đạt cực đại ngay từ dải tua cực thấp 1.000 rpm (dải tì kéo dầy 1.000 - 2.800 rpm)',
      'C. Đạt cực đại tại dải tua cố định đúng 3.000 rpm',
      'D. Đạt cực đại tại dải tua rất cao trên 4.500 rpm'
    ],
    correct_answer: 'B',
    explanation: 'Động cơ Aucan 4F25 đạt mô-men xoắn xoắn tối đa 320 Nm vô cùng sớm ngay từ 1.000 vòng/phút. Điều này giúp xe đề pa cõng tải cực khỏe, triệt tiêu độ trễ turbo, hạn chế rung giật và tiết kiệm nhiên liệu dải dài khi vận chuyển bến bãi miền Bắc.'
  },
  {
    id: 5,
    category: 'Sản phẩm',
    question: 'Khi khách hàng thắc mắc tại sao cabin Aumark X25/X25L chỉ có 2 chỗ ngồi trong khi đối thủ có 3 chỗ, TVBH nên thuyết phục theo cách nào?',
    options: [
      'A. Xin lỗi vì sơ suất thiết kế và hứa hỗ trợ lắp thêm ghế phụ lậu ở giữa.',
      'B. Thừa nhận và tự động giảm giá xe 10 triệu đồng để bù đắp sự thiếu hụt vị trí.',
      'C. Phân tích: Thiết kế 2 ghế tự lập độc lập bản rộng giúp tối ưu rộng rãi cabin, tạo khoảng trống riêng tư thoải mái đỡ mệt mỏi cho bác tài đô thị, đồng thời giúp thao tác rơ gạt số, giật phanh tay chuẩn xác an toàn.',
      'D. Nói với khách rằng luật giao thông Việt Nam phạt nặng nếu xe tải 1.9T chở 3 người.'
    ],
    correct_answer: 'C',
    explanation: 'Đây là tư duy xoay chuyển băn khoăn đỉnh cao. Cabin 2 chỗ rộng thoải mái mang đến trải nghiệm dễ chịu chống ê mỏi dọc sườn hơn là 3 chỗ chen chúc. Việc nhét thêm 1 ghế phụ cực nhỏ ở giữa thực chất gây cản trở và mất an toàn khi tài xế cần phanh gấp hay sang số gấp.'
  },
  {
    id: 6,
    category: 'Sản phẩm',
    question: 'Sự phối hợp truyền động cao cấp trên dòng Aumark X25/X25L là sự kết hợp giữa khối máy Aucan 4F25 và thương hiệu hộp số danh tiếng nào?',
    options: [
      'A. Hộp số lắp ráp nội địa Thaco truyền thống',
      'B. Hộp số liên doanh ZF từ châu Âu (5 số tiến, 1 lùi) giúp truyền lực đạt hiệu suất đến 95%',
      'C. Hộp số Dymos nhập nguyên cụm từ xe tải Hyundai',
      'D. Hộp số tự động 8 cấp ly hợp kép ướt chuyên dụng.'
    ],
    correct_answer: 'B',
    explanation: 'Xe Aumark X25/X25L nâng tầm giá trị cốt lõi nhờ hộp số ZF (châu Âu) cao cấp vỏ nhôm giúp tản nhiệt vượt trội, sang số ngọt ngào mượt mà, tì truyền lực đạt hiệu năng 95% lý tưởng dừng đỗ đông rơ đô thị miền Bắc.'
  },
  {
    id: 7,
    category: 'Sản phẩm',
    question: 'Động cơ Aucan 4F25TC6 trang bị trên Aumark S35 (3.5T) sở hữu mô-men xoắn đạt đỉnh bao nhiêu và áp suất phun nhiên liệu đỉnh tế là bao nhiêu bar?',
    options: [
      'A. Đạt 320 Nm tại dải 1.500 rpm, áp suất phun 1.200 bar',
      'B. Đạt 400 Nm tại dải 1.300 - 2.700 rpm, áp suất phun Common Rail lên tới 2.000 bar',
      'C. Đạt 355 Nm tại dải 1.800 rpm, áp suất phun 1.600 bar',
      'D. Đạt 500 Nm tại dải 1.200 rpm, áp suất phun 1.800 bar'
    ],
    correct_answer: 'B',
    explanation: 'Aumark S35 được mệnh danh là mẫu xe mạnh nhất phân khúc 3.5 tấn nhờ khối động cơ đạt 158 mã lực, momen xoắn 400 Nm tại tua 1.300-2.700 rpm nhờ áp suất kim phun phun Common Rail cao áp lên đến 2.000 bar, xé tơi dầu giúp đốt cháy hoàn hảo.'
  },
  {
    id: 8,
    category: 'Sản phẩm',
    question: 'Khách hàng băn khoăn động cơ Aucan mới về Việt Nam ít thông dụng và lo lắng độ bền. TVBH nên tung "vũ khí cam kết đanh thép" nào của hãng để xử lý dứt điểm?',
    options: [
      'A. Tặng coupon thay nhớt máy miễn phí trong 1 năm đầu sử dụng.',
      'B. Cam kết tặng thêm xe mới nếu động cơ hỏng hóc lớn sau 6 tháng.',
      'C. Giới thiệu động cơ Aucan là thành quả tinh hoa thiết kế của Anh Quốc xuất đi 40 nước; được hãng cam kết bảo hành 60 tháng/200.000km kèm chính sách độc quyền: 1 đổi 1 Block động cơ (block engine).',
      'D. Bảo khách hàng tự mang đi kiểm tra ở phòng thí nghiệm nếu không yên tâm.'
    ],
    correct_answer: 'C',
    explanation: 'Sự tự tin sản phẩm được khẳng định bằng cam kết bảo hành 5 năm kỷ lục của hãng cùng chính sách "Độc tôn" đổi mới nguyên cụm lốc máy Block động cơ nếu có sự bàn cãi hỏng lỗi kỹ thuật.'
  },
  {
    id: 9,
    category: 'Sản phẩm',
    question: 'Hộp số cơ khí trang bị trên Aumark S35 (thùng 4.4m) là kiểu hộp số mang thương hiệu nào?',
    options: [
      'A. Hộp số Fast Gear 12 cấp lừng lẫy',
      'B. Hộp số ZF 5S408 châu Âu với tỷ số truyền tinh chỉnh',
      'C. Hộp số Hyundai Mighty 5 cấp',
      'D. Hộp số WLY 8 cấp liên doanh Trung - Nhật'
    ],
    correct_answer: 'B',
    explanation: 'Aumark S35 sử dụng đồng bộ hộp số ZF 5S408 của Đức, giúp xe phân bố tỷ số truyền hiệu năng cao, giảm mòn côn hao lực, tài xế vào số lướt phố êm xuôi nhàn nhã.'
  },
  {
    id: 10,
    category: 'Sản phẩm',
    question: 'Hệ thống phanh an toàn vượt cấp trang bị trên dòng Aumark S50 (5 tấn) bao gồm những kết cấu kỹ thuật tân tiến nào?',
    options: [
      'A. Phanh tang trống trợ lực thuỷ lực không tích hợp hệ thống kiểm soát điện tử',
      'B. Phanh đĩa trước, tự động bổ sang phanh tay cơ khí dây cáp phụ trợ',
      'C. Phanh hơi lốc kê khí nén kết hợp hệ thống chống bó cứng phanh ABS 4 kênh, chống trượt bánh ASR, khởi hành ngang dốc HSA',
      'D. Phanh từ trường giảm chấn bến mỏ chuyên dụng chạy hầm sâu'
    ],
    correct_answer: 'C',
    explanation: 'Aumark S50 mang tầm vóc an toàn tuyệt đối cực kỳ quý hiếm trong phân khúc tải trung 5 tấn nhờ phanh khí nén hơi lốc kê an toàn, tích hợp sẵn ABS 4 kênh, chống trễ lết bánh trượt ASR và hỗ trợ xuất dốc HSA cực kì yên tâm trên mọi nẻo đồi cao Tây Bắc.'
  },
  {
    id: 11,
    category: 'Sản phẩm',
    question: 'Khối động cơ dã chiến Cummins ISF3.8s5154 trang bị trên Aumark S50 (5 tấn) đạt sức mô-men cực đại bao nhiêu?',
    options: [
      'A. Đạt 400 Nm tại dải tua 1.500 rpm',
      'B. Đạt 500 Nm tại dải tua dầy 1.200 - 1.900 rpm',
      'C. Đạt 600 Nm tại dải tua 1.300 rpm',
      'D. Đạt 340 Nm tại dải tua 1.800 rpm'
    ],
    correct_answer: 'B',
    explanation: 'Máy Cummins 3.8L của Aumark S50 cho sức kéo đáng gờm 500 Nm duy trì ổn định ngay cực sớm tại tua 1.200 đến 1.900 vòng/phút, bảo đảm leo đồi chở nặng xuất sắc mà máy vẫn êm dịu, không bị đuối số rít rít.'
  },
  {
    id: 12,
    category: 'Sản phẩm',
    question: 'Hai dòng sản phẩm tải trung Aumark S70 và S70L (7 tấn) có sự phân phân hóa kỹ thuật thế nào để giúp khách mua đúng mục đích?',
    options: [
      'A. S70 máy xăng tiết kiệm, S70L máy dầu chuyên chở nặng liên tỉnh',
      'B. S70 chỉ chạy nội bộ nhà máy cảng, S70L đăng kiểm chạy cao tốc liên tỉnh dải dài',
      'C. S70 định vị tải cao - thùng ngắn (5.2m) bám hàng rời xi măng gạch ngói dã chiến; S70L định vị thùng dài lực lớn (6.3m) chở đa dụng logistic dộp nhẹ liên tỉnh',
      'D. Hai dòng xe hoàn toàn đồng bộ lòng vách, chỉ khác biệt về màu sơn sơn phủ ngoài cabin'
    ],
    correct_answer: 'C',
    explanation: 'Tư duy bán xe tải: Không có cấu hình hoàn hảo cho mọi việc - Chỉ có cấu hình ăn rơ mục đích nhất. S70 lòng 5.2m gọn gàng tải lực bền phù hợp VLXD nặng nề. S70L lòng 6.3m chuyên cõng hàng khối lượng, hàng bao bì pallet, logistic bứt tốc liên vùng.'
  },
  {
    id: 13,
    category: 'Sản phẩm',
    question: 'Hãy so sánh chiều dài thùng hàng của Foton Aumark S90 (9 tấn) với đối thủ trực tiếp JAC N900 Plus?',
    options: [
      'A. Aumark S90 thùng dài 7.4m (lắp 6 pallet tiêu chuẩn), dài hơn đối thủ JAC N900 tới 400mm',
      'B. Aumark S90 thùng dài 7.0m, ngắn hơn đối thủ JAC N900 đuôi sườn dài 7.2m',
      'C. Aumark S90 thùng dài 6.2m, tối ưu chạy phố hẹp ngang phân khúc',
      'D. Hai dòng xe đều có chiều dài lòng thùng sườn phủ đạt bằng khít 7.0m'
    ],
    correct_answer: 'A',
    explanation: 'Foton S90 thống lĩnh rực rỡ với thùng dài tới 7.400 mm giúp chở gọn ghẽ 6 pallet tiêu chuẩn (JAC N900 sườn thùng chỉ đạt 7.000 mm khó xếp vừa gọn ô), dắt túi hiệu năng kinh tế vượt trội từng chặng dài.'
  },
  {
    id: 14,
    category: 'Sản phẩm',
    question: 'Khách hàng chê xe 9 tấn Aumark S90 dùng máy Cummins 3.8L (168 HP) đuối yếu hơn JAC N900 xài máy 4.5L (210 HP). TVBH Foton sành sỏi phản đòn lý luận thế nào?',
    options: [
      'A. Khuyên khách nếu thích khoẻ dã man thì chuyển qua mua đầu kéo của hãng lớn.',
      'B. Thừa nhận S90 bốc kém hơn nhưng bù lại dàn lốp xe to hơn vượt ráo.',
      'C. Phân tích: Thiết kế máy Cummins 3.8L (168HP) là tối ưu có chủ đích. Nếu anh chị chở đúng tải trọng sườn quy định thiết kế, máy 3.8L bốc dẻo dai phối bộ ZF vỏ nhôm tản nhiệt giúp gặt hái tiết kiệm dầu cực khủng qua từng tháng so với máy 4.5L quá khổ dư xăng tốn dầu.',
      'D. Bảo khách hàng cứ độ xoáy áp turbo bầu lọc để nâng thẳng công suất lên bằng 210 HP.'
    ],
    correct_answer: 'C',
    explanation: 'Nghệ thuật xử lý khôn ngoan của Chuyên gia Bán hàng: Trực diện bóc tách bài toán chi phí vận hành. Chở đúng tải thì bình dã chiến Cummins 3.8L chính là bộ cỗ máy gặt hái siêu tiết kiệm dầu hằng đêm, cự tuyệt chi phí dư thừa khổng lồ vận tải.'
  },
  {
    id: 15,
    category: 'Sản phẩm',
    question: 'Hộp số Direct Drive (trực tiếp) trang bị trên Đầu kéo 1 cầu Foton FV270 có ưu điểm kỹ thuật cốt lõi là gì?',
    options: [
      'A. Tự động sang số thông minh tuỳ theo gia tốc trọng lực kéo rơ moóc',
      'B. Tỷ số truyền ở cấp cao nhất đạt trị số tuyệt tối ưu 1:1, động cơ truyền chuyển động thẳng tắp không qua bánh răng giảm tốc trung gian, giật bứt tiết kiệm dầu vượt bực dải bằng',
      'C. Luôn cố định tỉ số truyền và không cho phép can thiệp phanh tay lốc lê dội sườn',
      'D. Hộp số CVT dây đai thép chuyên phơi dâu đô thị xanh sạch'
    ],
    correct_answer: 'B',
    explanation: 'Với hộp số Direct Drive tỉ số truyền tối đa 1:1, chuyển động của trục khuỷu cốt máy ăn khớp đồng bộ thẳng trục ra đuôi hộp số, bốc dứt khoát không hao hụt lực ma sát bánh răng trượt trung gian, càn quét tiêu hao dầu tối thiểu.'
  },
  {
    id: 16,
    category: 'Sản phẩm',
    question: 'Hệ thống an toàn cabin trên Đầu kéo Foton FV270 và dòng FV400/460 đáp ứng quy chuẩn gắt gao nào của châu Âu?',
    options: [
      'A. Quy chuẩn tự vệ an ninh toàn diện chống đạn NATO Level 1',
      'B. Quy chuẩn thử nghiệm va chạm bảo vệ người lái nghiêm ngặt UNECE R-29-03',
      'C. Chỉ đáp ứng tiêu chuẩn nội bộ của nhà máy Foton lắp ghép',
      'D. Quy chuẩn lội nước sâu ngập cabin rơ mỏ khí dã chiến'
    ],
    correct_answer: 'B',
    explanation: 'FV270, FV400, FV460 vượt qua sát hạch nghiêm khắc UNECE R-29-03 của châu Âu về độ giật hấp thụ va đập cabin chịu lực thép dầy, đảm bảo khung cabin không bị biến dạng đè bẹp bác tài khi xảy gập tai nạn.'
  },
  {
    id: 17,
    category: 'Sản phẩm',
    question: 'Hãy so sánh sức kéo mã lực và dòng máy dã dã của tải thùng Auman C160M với đối thủ Chenglong M3 180?',
    options: [
      'A. Hai dòng xe có cùng sức mạnh động cơ Yuchai 180 HP cơ bản kéo sườn giống hệt.',
      'B. Auman C160M sử dụng động cơ Yuchai dã chiến YC6JA220-50 dũng mãnh 6 máy cho công suất 220 HP, momen xoắn 860 Nm, vượt cấp lội dốc đèo so với Chenglong M3 180 (chỉ dùng máy 180 HP, momen xoắn 800 Nm)',
      'C. Chenglong M3 180 khỏe khỏe vượt trội Auman C160M ở dải dốc núi cao mỏ đá',
      'D. Auman C160M dùng động cơ điện không chổi than tiết kiệm dải cước đô thị xanh'
    ],
    correct_answer: 'B',
    explanation: 'Auman C160M càn quét lòng dốc đèo tốt vượt bậc nhờ khối động cơ Yuchai 6 máy dũng mãnh đạt công suất tới 220 mã lực dải rộng (momen 860Nm dầy). Đối thủ Chenglong M3 180 yếu thế hơn hẳn khi chỉ xài cỗ máy 180 mã lực dải hẹp.'
  },
  {
    id: 18,
    category: 'Sản phẩm',
    question: 'Dòng tải thùng dã chiến 3 chân Auman C240 (thùng dài 9.7m) trang bị khối máy Cummins ISD270 50 dũng mãnh đi kẹp dàn treo sau thế nào?',
    options: [
      'A. Dàn treo sau dạng thủy lực nhẹ nhàng của xe bus trung',
      'B. Dàn treo sau nhíp lá dầy cộp xếp lá chắc chắn (cấu hình 10/12) siêu gánh tải nặng',
      'C. Dàn treo điện tử điều biến dầu thuỷ lực êm ái đô thị rơ',
      'D. Hệ nhíp gió bầu treo khí không dùng lá sắt chịu cày'
    ],
    correct_answer: 'B',
    explanation: 'Auman C240 cõng tải nặng (gạo nông sản mỏ mỏ gạch ngói miền Bắc) dẻo dai bám sườn nhờ cầu sau 13.000 + 13.000 kg phối kẹp bộ nhíp lá dày dặn bậc nhất cấu hình (10/12), nhún lượn dẻo dai thăng bằng trên đường lổ loang lầy lội Tây Bắc cực kỳ vững trãi.'
  },
  {
    id: 19,
    category: 'Sản phẩm',
    question: 'Khách lo lắng gương chiếu hậu tay đòn to lớn nhô xa sườn của xe Aumark X25 dễ bị va quẹt đường ngõ rỏ miền Bắc. TVBH lật ngược thế cờ tư vấn ưu điểm ngách này thế nào?',
    options: [
      'A. Đề xuất khách gỡ ra ném bỏ, mua gương dán tròn ô bé tí gắn thẳng kính xài tạm.',
      'B. Phân tích: Gương đòn bệ mặt dập nổi giúp gương nhô xa hết nấc loại trừ góc chết ẩn giấu dọc hông vách thùng sâu; Đồng thời gương này là "thước đo sườn chuẩn": Ngõ hẹp gương lách thọt sang lọt qua được đầu thì 100% rơ mông thùng sau vuốt trôi theo gọn ráo.',
      'C. Nói với khách gương đòn giúp tăng khả năng khí động học khi xé gió bứt tốc',
      'D. Bảo khách gương to để soi gương vuốt vuốt tóc cá nhân lúc mệt mỏi dừng đỗ'
    ],
    correct_answer: 'B',
    explanation: 'Đúc rút chiến thực: Với cánh tài xế miền Bắc luồn ngõ sâu bến bãi nếp rơ, gương tay đòn chính là cánh tay nối dài báo chuẩn cự ly. "Gương qua là xe chắc chắn qua", dẹp tan nỗi lo quẹt vỡ khơ vách thùng hàng phía sau.'
  },
  {
    id: 20,
    category: 'Sản phẩm',
    question: 'Vì sao một TVBH Foton uyên bác cần nắm vững dải sản phẩm CKD và CBU của hãng trên thị trường?',
    options: [
      'A. Để lừa khách hàng rằng toàn bộ xe Foton đều nhập nguyên chiếc từ Đức',
      'B. Để dễ bề bấu víu nâng hạ giá tuỳ ý thích xúc cảm cá nhân',
      'C. Để phân loại rõ ràng cấu hình, thấu sâu thế mạnh chế tác lắp ráp lắp dán (CKD) tối ưu kinh tế cho tải nhẹ; và sự kiên cố nhập khẩu nguyên chiếc (CBU) dũng mạnh của dàn đầu kéo tải nặng dã dã, tư vấn trúng khấc tài chính của KH miền Bắc',
      'D. Vì đây là quy chuẩn kiểm tra bắt buộc của cục xuất nhập khẩu hải bến'
    ],
    correct_answer: 'C',
    explanation: 'Cầm trịch dải sản phẩm Foton (Một thương hiệu - Ba tầm vóc - Phủ toàn phân khúc), TVBH phải thấu tường đường đi của các dòng lắp ráp linh kiện đồng bộ phân khúc nhẹ (CKD: Wonder, X25, S35/S50) và dòng xe nhập tải nặng nguyên con dũng mãnh (CBU: C160, đầu kéo FV). Tư vấn trúng hồng tâm, khớp chuẩn tài chính.'
  }
];

// Parameter matrices for programmatic question multiplier
const models = [
  { name: 'Foton Wonder', segment: 'Tải Nhẹ (LDT)', type: 'Xăng', engine: 'DAM16NS 1.6L', power: '118 HP', torque: '152 Nm', payload: '990 kg', length: '2.8m', warranty: '36 tháng / 100.000 km', price: 'Dưới 220 triệu' },
  { name: 'Aumark X25', segment: 'Tải Nhẹ (LDT)', type: 'Dầu', engine: 'Aucan 4F25 2.5L', power: '130 HP', torque: '320 Nm', payload: '1.99 tấn', length: '3.75m', warranty: '36 tháng / 100.000 km', price: 'Khoảng 400 triệu' },
  { name: 'Aumark X25L', segment: 'Tải Nhẹ (LDT)', type: 'Dầu', engine: 'Aucan 4F25 2.5L', power: '130 HP', torque: '320 Nm', payload: '2.49 tấn', length: '4.35m', warranty: '36 tháng / 100.000 km', price: 'Khoảng 430 triệu' },
  { name: 'Aumark S35', segment: 'Tải Nhẹ (LDT)', type: 'Dầu', engine: 'Aucan 4F25TC6', power: '158 HP', torque: '400 Nm', payload: '3.49 tấn', length: '4.4m', warranty: '60 tháng / 200.000 km', price: 'Dưới 500 triệu' },
  { name: 'Aumark S50', segment: 'Tải Trung (MDT)', type: 'Dầu', engine: 'Cummins ISF3.8', power: '154 HP', torque: '500 Nm', payload: '4.9 tấn', length: '5.2m', warranty: '36 tháng / 100.000 km', price: 'Khoảng 620 triệu' },
  { name: 'Aumark S70L', segment: 'Tải Trung (MDT)', type: 'Dầu', engine: 'Cummins ISF3.8', power: '168 HP', torque: '500 Nm', payload: '6.9 tấn', length: '6.3m', warranty: '36 tháng / 100.000 km', price: 'Khoảng 730 triệu' },
  { name: 'Aumark S90', segment: 'Tải Trung (MDT)', type: 'Dầu', engine: 'Cummins ISF3.8', power: '168 HP', torque: '500 Nm', payload: '8.9 tấn', length: '7.4m', warranty: '36 tháng / 100.050 km', price: 'Khoảng 800 triệu' },
  { name: 'Auman C160M', segment: 'Tải Nặng (HCV)', type: 'Dầu', engine: 'Yuchai YC6JA 6.8L', power: '220 HP', torque: '860 Nm', payload: '9.1 tấn', length: '8.2m', warranty: '36 tháng / 100.000 km', price: '950 triệu' },
  { name: 'Auman C240', segment: 'Tải Nặng (HCV)', type: 'Dầu', engine: 'Cummins ISD270 6.7L', power: '270 HP', torque: '970 Nm', payload: '14 tấn', length: '9.7m', warranty: '36 tháng / 100.000 km', price: 'Hơn 1.25 tỷ' },
  { name: 'FV270', segment: 'Đầu kéo (Tractor)', type: 'Dầu', engine: 'Cummins ISGe4', power: '270 HP', torque: '1250 Nm', payload: 'Sức kéo 31.8 tấn', length: 'Mâm xoay dã chiến', warranty: '36 tháng / 100.000 km', price: 'Khoảng 1.4 tỷ' },
  { name: 'FV400', segment: 'Đầu kéo (Tractor)', type: 'Dầu', engine: 'Cummins ISGe4', power: '400 HP', torque: '2100 Nm', payload: 'Sức kéo 39 tấn', length: 'Mâm xoay hàng nặng', warranty: '36 tháng / 100.000 km', price: 'Khoảng 1.6 tỷ' },
  { name: 'FV460', segment: 'Đầu kéo (Tractor)', type: 'Dầu', engine: 'Cummins ISGe4', power: '460 HP', torque: '2300 Nm', payload: 'Sức kéo 39 tấn', length: 'Mâm kéo khủng', warranty: '36 tháng / 100.000 km', price: 'Hơn 1.8 tỷ' }
];

const competitors = [
  { name: 'Teraco Tera 100S', brand: 'Daehan', segment: 'Tải Nhẹ', engine: 'Mitsubishi 1.3L 92HP', power: '92 HP', length: '2.8m' },
  { name: 'Thaco Frontier TF230', brand: 'Thaco', segment: 'Tải Nhẹ', engine: 'CN Nhật Bản 122HP', power: '122 HP', length: '2.8m' },
  { name: 'Thaco Kia K250', brand: 'Thaco Kia', segment: 'Tải Nhẹ', engine: 'Hyundai D4CB', power: '130 HP', length: '3.5m' },
  { name: 'Hyundai Mighty N250SL', brand: 'Hyundai Thành Công', segment: 'Tải Nhẹ', engine: 'Hyundai D4CB', power: '130 HP', length: '4.3m' },
  { name: 'Isuzu QKR 270', brand: 'Isuzu Việt Nam', segment: 'Tải Nhẹ', engine: 'Isuzu BluePower', power: '105 HP', length: '4.3m' },
  { name: 'JAC N350S', brand: 'JAC Việt Nam', segment: 'Tải Nhẹ', engine: 'Cummins 2.8L', power: '120 HP', length: '4.3m' },
  { name: 'Hino 300 Series XZu', brand: 'Hino Việt Nam', segment: 'Tải Trung', engine: 'Hino N04C', power: '150 HP', length: '5.7m' },
  { name: 'JAC N900 Plus', brand: 'JAC Việt Nam', segment: 'Tải Trung', engine: 'Cummins 4.5L', power: '210 HP', length: '7.0m' },
  { name: 'Chenglong M3', brand: 'Chenglong Hải Âu', segment: 'Tải Nặng', engine: 'Yuchai 180HP', power: '180 HP', length: '8.2m' }
];

const northernProvinces = [
  { name: 'Hà Nội', route: 'giao hàng phố cổ quận Hoàn Kiếm luồn ngõ hẹp' },
  { name: 'Hải Phòng', route: 'xe tải ra vào bến cảng Cát Bi hoặc vận tải Logistics Tràng Duệ' },
  { name: 'Quảng Ninh', route: 'xe tải chở hàng dã chiến mỏ than Cẩm Phả dốc gập ghềnh' },
  { name: 'Lạng Sơn', route: 'tuyến hàng hoa quả nông sản lên Cửa khẩu Tân Thanh, Hữu Nghị đồi núi' },
  { name: 'Sơn La', route: 'leo đèo dốc quanh co Pha Đin, dốc cao rợn người' },
  { name: 'Lào Cai', route: 'cao tốc dốc leo Sapa bồng bềnh mây chở rau sạch liên tỉnh' },
  { name: 'Yên Bái', route: 'vận tải lâm thổ sản, gỗ bóc nặng nề tì kéo sâu' },
  { name: 'Thái Nguyên', route: 'chở tôn thép bệ sắt từ Gang Thép Thái Nguyên về bãi phân phối' },
  { name: 'Bắc Giang', route: 'vận chuyển vải thiều Bắc Giang xuất khẩu gánh tải dầy nhịp lá' },
  { name: 'Hải Dương', route: 'giao thực phẩm tươi sống Hải Dương về chợ đầu mối Long Biên đêm' }
];

// Seeded generator to keep questions 100% deterministic and reproducible
function getSeededIndex(id: number, offset: number, modulo: number): number {
  return Math.abs((id * 9301 + offset) % 233280) % modulo;
}

// Compact helper to build complete realistic interactive scenarios
function compileQuestion(
  id: number,
  category: 'Sản phẩm' | 'Thị trường' | 'Kỹ năng',
  rawQuestion: string,
  correctText: string,
  distractors: [string, string, string],
  explanation: string
): Question {
  const correctOptionIndex = getSeededIndex(id, 17, 4);
  const rawOptions: string[] = [];
  let distractorIdx = 0;
  for (let i = 0; i < 4; i++) {
    if (i === correctOptionIndex) {
      rawOptions.push(correctText);
    } else {
      rawOptions.push(distractors[distractorIdx++]);
    }
  }

  const letters = ['A', 'B', 'C', 'D'] as const;
  const formattedOptions = rawOptions.map((opt, i) => `${letters[i]}. ${opt}`);
  
  return {
    id,
    category,
    question: rawQuestion,
    options: formattedOptions,
    correct_answer: letters[correctOptionIndex],
    explanation
  };
}

// Generate remaining 580 questions deterministically
const generatedQuestions: Question[] = [];
const TOTAL_QUESTIONS = 600;

for (let id = 21; id <= TOTAL_QUESTIONS; id++) {
  // Select components based on seeded algorithms linked to the unique id
  const m = models[getSeededIndex(id, 149, models.length)];
  const c = competitors[getSeededIndex(id, 283, competitors.length)];
  const p = northernProvinces[getSeededIndex(id, 401, northernProvinces.length)];
  
  if (id <= 213) {
    // CATEGORY: PRODUCTS (Sản phẩm)
    const subType = id % 6;
    if (subType === 0) {
      generatedQuestions.push(compileQuestion(
        id, 'Sản phẩm',
        `Sức kéo tải thực địa tại tỉnh ${p.name}: Dòng xe tải bệ vệ ${m.name} sở hữu động cơ ${m.engine} đạt momen xoắn tối đa ${m.torque}. Giá trị kỹ thuật này giúp ích sâu gì cho bác tài thực hiện tuyến đường ${m.length === 'Đầu kéo' ? 'kéo moóc' : 'giao hàng'} ?`,
        `Đạt lực kéo cực đại sớm ở dải tua thấp giúp xe đề-pa leo dốc đề kháng lầy tuyệt hảo, khử trễ turbo và tiết kiệm dầu siêu việt.`,
        [
          `Cho phép ngắt hoàn toàn hệ thống lọc khí thải để tăng áp suất xi-lanh ảo lên gấp 3 lần dâng khí.`,
          `Hỗ trợ tự dồn dòng điện từ ắc quy sang trực tiếp trục láp bánh dẫn để chạy không tốn nhiên liệu trong đô thị.`,
          `Cắt bớt lượng nhớt làm mát máy mà vẫn cày ải liên tục 48 tiếng đèo dốc rực rỡ không lo bó kẹt.`
        ],
        `Thiết kế lốc máy đời mới của ${m.name} tập trung tối đa lực kéo ${m.torque} tại dải tua rất thấp, tối ưu cho việc leo dốc tại ${p.name} mà động cơ vẫn mát tay, êm ru và hạn chế đóng cặn carbon buồng đốt.`
      ));
    } else if (subType === 1) {
      generatedQuestions.push(compileQuestion(
        id, 'Sản phẩm',
        `Cam kết Vàng hậu mãi: Xe ${m.name} được nhà máy áp dụng chính sách bảo hành chính hãng là ${m.warranty}. Khi khách hàng ở ${p.name} e ngại thương hiệu xe tải liên doanh khó đồng bộ dọc đường, TVBH Foton nên thuyết phục thế nào?`,
        `Nhấn mạnh cam kết bảo hành cực dài chứng minh độ tự tin động cơ chuẩn của nhà máy, đi kèm trạm dịch vụ phân phối phủ rộng khắp Bắc Giang, Hà Nội hay cả nước hỗ trợ 24/7.`,
        [
          `Bảo khách tự mua thêm một lốc máy dự phòng của xe cỏ đặt ở sườn thùng đề phòng khi đổ đèo bị vỡ lốc.`,
          `Cam kết tặng luôn 1 cây xăng miễn phí trọn đời cho chủ xe nếu xe bị rỉ sét do dính nước mưa ngoài vỉa hè.`,
          `Khuyên khách chỉ nên chạy xe vào ban ngày cự ly dưới 5km để tránh phát sinh kỳ hạn bảo dưỡng của xe tải.`
        ],
        `Cam kết bảo hành ${m.warranty} từ Foton là bệ đỡ vững chắc cho dòng xe ${m.name}, đập tan nỗi sợ nằm đường của doanh nghiệp logistics chạy tuyến ${p.name}.`
      ));
    } else if (subType === 2) {
      generatedQuestions.push(compileQuestion(
        id, 'Sản phẩm',
        `Gánh tải dẻo dai tại địa hình ${p.name}: Chassis cường độ cao sườn gầm của chiếc ${m.name} được chế tạo kiên cố ra sao để vượt ${p.route} trơn trượt đứt gầm dã chiến tốt nhất?`,
        `Khung dầm mác thép cường lực dập nguyên khối cực dày dặn kết lực nhíp lá gánh đa tầng chống uốn oằn tuyệt vời khi cõng cước quá tải dột mỏ.`,
        [
          `Thép dập mỏng nhẹ đàn hồi cao như lá lúa để uốn lượn lọt ngõ hẹp không lo va chạm.`,
          `Có cấu trúc composite rỗng chứa khí nén nâng đỡ giúp xe tải lướt nhẹ nổi bồng bềnh trên vũng sình lầy địa hình.`,
          `Được kết nối bằng nam châm điện có khả năng co giãn tăng chiều dài xe linh hoạt lên gấp rưỡi để bù tải hàng.`
        ],
        `Chassis gầm xe tải Foton (${m.name}) dập nguội nguyên khối áp lực cao, chịu gằn cực tốt, bảo hiểm tính vững trãi khi xe leo tuyến hiểm trở ${p.name}.`
      ));
    } else if (subType === 3) {
      generatedQuestions.push(compileQuestion(
        id, 'Sản phẩm',
        `Công nghệ Cabin tiên tiến: Xe tải ${m.name} sở hữu những tiện nghi cabin vượt trội nào hỗ trợ trực tiếp tinh thần tập trung lái cho tài già chạy tuyến đầy mệt mỏi ${p.route}?`,
        `Hệ thống làm lạnh siêu sâu nhanh chóng, phím rảnh tay vô lăng sành sỏi kết kẹp Cruise điều tốc tự động độc lý tưởng chạy bến.`,
        [
          `Hệ thống màn hình ảo giác đa chiều và cụm loa bass dập sàn tự động rung lắc để tài xế không bao giờ mệt.`,
          `Ghế lái tự sấy nóng tản nhiệt độ 100 độ C để rèn luyện tinh thần kiên cường cho bác tài đường dài Tây Bắc.`,
          `Hệ thống điều khiển bay tự động tự lách ổ gà lội bùn không cần người lái can thiệp vô lăng bến mỏ.`
        ],
        `Sự êm ái cabin là đặc sản xe Foton (${m.name}), hướng tới bảo vệ sức khỏe dài hạn, bớt ê mỏi lưng sườn cho lái xe chạy đêm vùng biên ${p.name}.`
      ));
    } else if (subType === 4) {
      generatedQuestions.push(compileQuestion(
        id, 'Sản phẩm',
        `Xử lý phanh an toàn đổ dốc dã địa tại ${p.name}: Xe Foton ${m.name} được lắp đặt hệ thống phanh vượt cấp bảo vệ cả đoàn hàng cước chạy ${p.route} dựa vào cơ chế gì?`,
        `Phanh tang trống/đĩa tự động chỉnh khe hở má phanh đi kẹp ABS chống lướt tự động xả khí an toàn tuyệt lực leo xóc sâu.`,
        [
          `Hệ thống phanh nam châm từ vĩnh cửu tự hít đĩa phầm thẳng xuống lòng đường sắt gầm lột bến dốc.`,
          `Bộ phanh bằng cao su luộc dán nhám ép chặt tay đòn mỗi khi tài xế giật tay phanh cáp mộc mạc xe lôi.`,
          `Cơ cấu hãm giảm chấn tự động phun cát dầy xuống lốp xe để ma sát dừng đứng lập tức khi đổ đèo dốc thẳm.`
        ],
        `Trang bị phanh ABS cùng phanh khí xả đổ đèo trên dòng xe ${m.name} cứu sinh các tình huống đổ đèo hiểm núi tại ${p.name}, tránh rủi ro mất phanh cháy má.`
      ));
    } else {
      generatedQuestions.push(compileQuestion(
        id, 'Sản phẩm',
        `Mục đích khai thác tối ưu: Với dòng sản phẩm ${m.name} có dải tải trọng thiết kế là ${m.payload}, cấu hình lòng thùng kích thước tầm ${m.length}, dòng xe này ăn rơ nhất cho nhóm khách hàng vận chuyển loại hàng nào ở ${p.name}?`,
        `Nhóm chuyên hàng nông sản nặng bến cảng, vật liệu dã chiến gân guốc, bưu phẩm Logistics bọc lớn cần bốc dẻo nhanh.`,
        [
          `Chuyên chở chất lòng hóa chất cực độc tự trôi không bình đóng dải lộ dã gầm phố hẹp.`,
          `Đoàn xe rước dâu siêu trường siêu trọng trong các ngõ hẹp của thành phố Hà Nội hằng biên dốc.`,
          `Gia đình nhỏ chở hàng tạp hóa bánh kẹo quãng ngắn quanh vỉa hè sân bay bến đỗ.`
        ],
        `Tầm vóc thiết kế của ${m.name} gánh tải dồi dào, kích thước xe cân đối hợp lý bảo bảo toàn cước kinh doanh, giải quyết hoàn hảo bài toán mặt hàng logistics tại tuyến ${p.name}.`
      ));
    }
  } else if (id <= 406) {
    // CATEGORY: COMPETITION (Thị trường)
    const subType = id % 5;
    if (subType === 0) {
      generatedQuestions.push(compileQuestion(
        id, 'Thị trường',
        `So găng trực diện TCO tại địa bàn ${p.name}: Khách hàng cân cân nhắc chọn mua chiếc ${c.name} (hiệu ${c.brand}) do giá bán ban đầu tiết kiệm hơn đôi chút đối với dòng ${m.name} của bạn. Chuyên gia tư vấn Foton gạt rào cản thế nào?`,
        `Chứng minh tiền bớt ban đầu siêu nhỏ so với số tiền dầu diesel dội ra hàng năm của ${c.name}, cộng hao hụt bảo trì và phí nằm đắp xưởng sửa lẻ dã xe.`,
        [
          `Xui khách hàng bóc bớt ốp cabin sườn cabin của xe Foton gá bán sắt vụn để thu hồi bù mảng chênh giá tiền ban đầu.`,
          `Thừa nhận là xe mình kém xa đối thủ dạt mỏ về độ bền bỉ và khuyên khách cứ mang tiền sang đại lý đối thủ mua nhanh.`,
          `Hứa lách luật cam kết tặng trọn đời phụ tùng mỏ lết dầu nhớt cho khách hàng tự về chế gá dầm lôi.`
        ],
        `Quản trị vận tải: Chí phí nhiên liệu và nằm đường là hai tử huyệt lớn nhất. Foton ${m.name} sở hữu động cơ và ZF/hộp số châu Âu hiệu năng 95% triệt hạ chí phí đó so với dòng ${c.name} tại ${p.name}.`
      ));
    } else if (subType === 1) {
      generatedQuestions.push(compileQuestion(
        id, 'Thị trường',
        `Đo sức bền cơ bắp leo tuyến đường núi ${p.route}: Khách so đo mã lực máy của xe ${m.name} (${m.power}) có vẻ thọt hụt nhỏ ảo so với dòng xe ${c.name} của hãng ${c.brand}. Bạn giải mã công năng thực tế thế nào?`,
        `Phân tích bài toán momen kéo sườn dầy ở tua cực thấp của Foton giúp xe leo dốc khỏe dũng mãnh dẻo dai hơn, không gầm rít tốn dầu ảo tua cao như ${c.name}.`,
        [
          `Thừa nhận Foton bốc yếu hơn hẳn nên khuyên khách chỉ dám bò tà tà ngoài lề đường bằng dải rộng bến bằng.`,
          `Tư vấn khách hàng sắm thêm động cơ xe cỏ cũ nát cơi gá tự giật lùi bổ trợ áp lực kéo gác sườn.`,
          `Đề xuất sắm bình nitơ xịt lửa để xốc ga phụt khói xé gió đèo núi dã bến.`
        ],
        `Mã lực tối đa chỉ đạt ở tua cực cao trên giấy tờ, còn cốt cõng nặng leo đèo dốc ${p.name} là tài mô-men xoắn đạt cực sớm dầy dặn của Foton (${m.name}) vượt xa đối thủ ${c.name}.`
      ));
    } else if (subType === 2) {
      generatedQuestions.push(compileQuestion(
        id, 'Thị trường',
        `Bài toán thể tích lòng thùng bến cảng tại ${p.name}: So sánh kích thùng chứa ${m.name} (${m.length}) với em ${c.name} (${c.length}). Lợi thế thực dụng của vách thùng Foton thiết kế là gì?`,
        `Thùng xe Foton dập định cỡ vàng chuẩn pallet hàng bưu chính hoặc nông sản xuất khẩu miền Bắc, cự tuyệt việc móp vỡ biến dạng vách sườn so với ${c.name}.`,
        [
          `Thùng Foton thu hẹp lòng trong tột bậc để khách xếp hàng thọt thò xéo ra hai bên vách sườn bốt lết dạt phố.`,
          `Foton Wonder sử dụng vật liệu nỉ bọc mành mành tre thay vách sắt thép để thùng xe nhẹ nhàng đàn hồi hột dốc.`,
          `Hỗ trợ khách hàng tự cưa dỡ bỏ hoàn toàn cabin để tăng thể tích thùng dài gấp đôi dài ra phía trước bệ vô lăng.`
        ],
        `Sự định hình lòng thùng Foton ${m.name} chặt chẽ khớp khổ hàng pallet công nghiệp tại ${p.name}, đem lại dòng cước cao, xếp hạ hàng trơn tru hơn hẳn đuôi tôn thủ công của ${c.name}.`
      ));
    } else if (subType === 3) {
      generatedQuestions.push(compileQuestion(
        id, 'Thị trường',
        `Phá vỡ định kiến thương hiệu ở vùng biên ${p.name}: Khi tài già thắc mắc xe Foton dùng động cơ liên doanh bền hay hỏng, tốn hơn phụ tùng của dòng ${c.name} (hiệu ${c.brand}). Bạn lật ngược lòng tin bằng minh chứng gì?`,
        `Foton là thương hiệu tải quốc tế gán mác xuất khẩu 40 nước, linh kiện phụ tùng liên kết Cummins/Daimler dạt Bắc cực kì phong phú, siêu rẻ dễ tháo lắp gá sườn hơn ${c.name}.`,
        [
          `Bảo khách khi hỏng sẽ được mượn trực tiếp xe mới của tổng kho để đi cướp tải dạt dã miễn phí không phải đền.`,
          `Nói thật là xe Foton chế tác rã của xe cũ Thaco rải rác nên mua đại ngoài ngõ vỉa hè đầy rác xài tạm được.`,
          `Đưa giấy biên nhận đại lý tự đóng dấu cam kết nộp thay tiền thuế kinh doanh trọn đời cho chủ xe.`
        ],
        `Hệ thống lắp ráp tinh nhuệ và mạng lưới hỗ trợ phụ tùng dồi dào gạt đi nỗi lo sửa chữa gầm máy của xe ${m.name} so với sự khan hiếm linh kiện lẻ tẻ của ${c.name} tại địa bàn ${p.name}.`
      ));
    } else {
      generatedQuestions.push(compileQuestion(
        id, 'Thị trường',
        `Chọn cấu hình thông minh: Dòng tải ${m.name} gánh tải ${m.payload} và dòng đối thủ ${c.name} chinh phục các nhà xe tại ${p.name}. Sự vượt trội về hệ nhíp gánh và dập khung sắt-xi gầm của Foton đem lại an toàn gì cho tài chạy ${p.route}?`,
        `Gánh gầm cao ráo phẳng bệ dập chịu tải gấp đôi thiết kế dư sườn, nhíp gối hai tầng hấp thụ lực nhún êm đềm, không lo sập gãy trục xéo như ${c.name}.`,
        [
          `Sử dụng bóng bay xốp chứa khí hydro cắm đuôi thùng giảm xóc bay lên đỡ cày ải sườn nhíp bến bãi.`,
          `Không dùng nhíp lá cứng nhắc mà Foton thay hoàn toàn bằng lò xo dây thun mềm linh hoạt chịu lực dẻo dốc.`,
          `Phun keo sáp nhựa bọc quanh hệ cầu sau để chống ma sát với cát đá mỏ mỏ rác than đồi núi.`
        ],
        `Kết cấu nhíp hai tầng đàn hồi cao cùng cầu sau chịu tải khủng của ${m.name} mang lại sự an tâm tuyệt đối trên cung ổ gà lầy lội ven sông tại ${p.name} so với dàn nhíp mỏng oằn sườn gầm của đối thủ ${c.name}.`
      ));
    }
  } else {
    // CATEGORY: SALES SKILLS & OBJECTION HANDLING & 9-MOTS (Kỹ năng)
    const subType = id % 5;
    if (subType === 0) {
      generatedQuestions.push(compileQuestion(
        id, 'Kỹ năng',
        `Tại Giai đoạn 3 (Khai thác nhu cầu) của quy trình vàng 9-MOTS: Bạn đón tiếp chủ doanh nghiệp bến bãi nông sản tại ${p.name} đang xem xe ${m.name}. Câu hỏi khai tâm sành sỏi mang tính khép khấc cọc là gì?`,
        `'Anh chị chuyên gánh tải đèo Lạng Sơn, dốc Sơn La hàng nông sản dập dầm dầy, hay gom Logistics bưu chính khu thành thị, yêu cầu then chốt về lòng thùng, sức kéo hay bảo dưỡng Block lốc máy máy dầu?'`,
        [
          `'Đoàn bến bãi của anh chị có quỹ đen tiền mặt bao nhiêu để em làm thủ tục tẩu tán bớt hóa đơn trốn thuế bến cảng?'`,
          `'Anh chị tính mua xe này chạy phá tải gãy gầm rồi vứt bãi phế liệu luôn hay có dùng mông má bán lại rã linh kiện?'`,
          `'Showroom Foton có buffet mát-xa miễn phí, anh chị có muốn đóng cọc đại vài triệu rồi vô phòng nghỉ nằm ngủ cả ngày không?'`
        ],
        `Hỏi trúng nhu cầu gánh tải đồi núi hay đô thị bằng phẳng của khách hàng tại ${p.name} giúp TVBH khảm trúng dòng xe ${m.name} đo ni đóng giày vốn sinh bạc lâu năm.`
      ));
    } else if (subType === 1) {
      generatedQuestions.push(compileQuestion(
        id, 'Kỹ năng',
        `Đập băn khoăn về xe liên doanh mới mẻ: Khi đối tác tại bến đỗ ${p.name} chê động cơ lốc máy Aucan/Cummins sườn bệ của xe Foton ${m.name} chạy không bốc oai phong như xe Hàn Isuzu/Hyundai cổ. Xử lý 3F rầm rầm như thế nào?`,
        `Đồng cảm (Feel) lo ngại cấu hình mới; Sẻ sẻ sẻ chia (Felt) hàng loạt tài già ${p.name} trước khi chốt cũng lo như vậy; Khai phóng giải pháp (Found) dàn lốc máy dập tiêu chuẩn Đức bốc mượt và ăn cực ít dầu rực sáng.`,
        [
          `Cãi vỗ mặt bắt bẻ khách hàng lỗi thời lạc hậu không biết cập nhật kiến thức xe con châu Âu đời mới dạt phố.`,
          `Thừa nhận lén lút là lốc máy này lắp ráp dán mác lậu từ các động cơ xe tải quá đát hư hỏng nặng ngoài bãi.`,
          `Hứa tự tay trích ví cá nhân 10 triệu hối lộ cho lái xe riêng để lái phụ họa xu nịnh thúc giục sếp kí mua.`
        ],
        `Phương pháp Feel-Felt-Found gạt rào phòng thủ của tài miền Bắc, chuyển hướng từ lo lắng vô cớ thành sự thán thấu hiệu quả tiêu hao dầu của cối máy Foton (${m.name}) dã chiến tại ${p.name}.`
      ));
    } else if (subType === 2) {
      generatedQuestions.push(compileQuestion(
        id, 'Kỹ năng',
        `Đàm phán kịch tính Giai đoạn 6 của 9-MOTS: Đoàn xe vận tải ở ${p.name} ép bạn giảm giá sâu chiếc ${m.name} thêm 15 triệu đồng nếu không sẽ rút tiền cọc đầu tư sang đại lý đối thủ. TVBH Foton uyên bác xử lý ra sao?`,
        `Tuyên bố giá trị xe tương xứng cam kết vàng, quy đổi 15 triệu bớt trực tiếp thành gói thẻ bảo dưỡng thay dầu nhớt lọc lọc định kỳ, dán phủ phủ nano chống rỉ dột cabin mỏ dốc đèo gầm cao.`,
        [
          `Nổi cáu quăng hồ sơ báo giá cự tuyệt giao dịch và lớn tiếng đuổi thẳng cổ nhà đầu tư ra khỏi showroom không tiếp thêm lời.`,
          `Sụt sùi xin lỗi nhận lỗi, khóc lóc trình bày hoàn cảnh nghèo khó để khách thương tình hoãn bớt ép tiền xe.`,
          `Hứa bí mật tháo bớt cụm phanh an toàn ABS hoặc lốp dự phòng của xe khác sang lắp đè vào bớt giá tiền lậu.`
        ],
        `Giữ giá trị sản phẩm và bọc quà tặng dịch vụ cản đường mài ép giá, biến áp lực chi chênh lệch thành chuỗi ngày an tâm chăm chiếc ${m.name} lăn xả cày tiền tại ${p.name}.`
      ));
    } else if (subType === 3) {
      generatedQuestions.push(compileQuestion(
        id, 'Kỹ năng',
        `Phân tích TCO lật ngược bàn cờ: Khách tại bến cảng ${p.name} từ từ chối sắm Foton Wonder vì lòng đắn đo tiếc nuối 20 triệu đồng so với xe cỏ bãi rã lắp ráp lậu. Bạn tư vấn bài toán Tổng chi phí sở hữu đánh gục băn khoăn thế nào?`,
        `Làm phép toán: 20 triệu tiết kiệm cỏ bốc hơi ráo rào ròng rã chỉ sau nửa năm chạy tốn dầu rỉ nhớt, cộng thêm 2 chuyến hàng đứt xích nằm gầm đường đèo nguy hiểm vắt ${p.route} trôi cước logistics.`,
        [
          `Bảo khách mua tạm xe cỏ cũ nát chạy tặc lách ngõ vỉa hè khi nào bị công an bắt giữ giam xe thì hãy cọc mua Foton Wonder.`,
          `Bảo khách xe Foton Wonder chạy bằng nước mưa bồng bềnh không cần đổ nhiên liệu gác bến dốc.`,
          `Khuyên đổi nhà bến bãi rút hết cổ đông bán gấp nhà cửa để vay tiền mua thẳng đầu kéo FV460 cho oai phong.`
        ],
        `Xử lý toán TCO nhấn chìm rào cản tài chính ban đầu. Sự dẻo dai kiên cường không hỏng lớn dọc đường của Foton Wonder là lời bảo chứng tuyệt vời cho nhà xe chạy bến tải ${p.name}.`
      ));
    } else {
      generatedQuestions.push(compileQuestion(
        id, 'Kỹ năng',
        `Mốc giao xe vinh quang Giai đoạn 8 quy trình 9-MOTS: Bạn tổ chức bàn giao em xe ${m.name} cho HTX vận tải ${p.name} chạy chuyên tải ${p.route}. Bạn làm gì để gieo hạt giống lòng tin thu về tệp Khách giới thiệu dồi dào miền Bắc?`,
        `Quy chuẩn hóa bàn giao trang trọng, trao hoa chụp ảnh bệ vệ, tặng cẩm nang rà phanh hơi rà số lốc máy dốc đèo gầm và cam kết phục vụ cứu hộ khẩn cấp từ các kỹ sư đại lý.`,
        [
          `Dúi vội chìa khóa cho tài xế nát bẩn mệt mỏi rũ ở góc showroom tranh tối tranh sáng rồi đuổi xe lăn bánh nhanh đi khỏi chật showroom.`,
          `Bắt đối tác ký cam biên lai hứa không bao giờ được phép ghé thăm đại lý sửa xe khác trên toàn tuyến đường dài phía Bắc.`,
          `Yêu cầu khách hàng nộp thêm cước phí 'bôi trơn' tip lộc cho kíp thợ khui nilông bọc ghế lái cabin mới.`
        ],
        `Bàn giao trang trọng củng cố sự hân hoan khi sắm em ${m.name}, giúp TVBH rễ sâu tệp khách giới thiệu truyền tai đáng đồng tiền bát gạo tại đất ${p.name}.`
      ));
    }
  }
}

// Export initial bank compiled from exactly 20 manual and 580 dynamic scenario-based questions (total 600 questions)
export const initialQuestions: Question[] = [...manualQuestions, ...generatedQuestions];
