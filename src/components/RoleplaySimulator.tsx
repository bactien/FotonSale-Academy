import React, { useState } from 'react';
import { 
  User, 
  MessageSquare, 
  TrendingUp, 
  CheckCircle, 
  HelpCircle, 
  Award, 
  RefreshCw,
  Sparkles,
  ChevronRight,
  Shield,
  Truck,
  MapPin,
  Flame,
  ThumbsUp,
  XCircle,
  Briefcase,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ScenarioRound {
  customerStatement: string;
  options: {
    key: 'A' | 'B' | 'C';
    text: string;
    points: number; // Trust score delta
    closureDelta: number; // Closure score delta
    feedback: string; // Customer reaction
    expertExplanation: string; // FAB / sales psychology tips
    strategyLabel: string; // strategy type description
  }[];
}

interface CustomerScenario {
  id: string;
  customerName: string;
  avatarBg: string;
  badge: string;
  location: string;
  role: string;
  cargo: string;
  targetProduct: string;
  targetProductSpecs: string;
  competitors: string;
  painPoints: string;
  intro: string;
  rounds: ScenarioRound[];
}

const customerScenarios: CustomerScenario[] = [
  {
    id: 'manh-haiphong',
    customerName: 'Anh Bùi Đức Mạnh',
    avatarBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    badge: 'Nhà Xe Logistics Cảng',
    location: 'Thủy Nguyên, Hải Phòng',
    role: 'Quản lý Đội xe Gom 12 chiếc',
    cargo: 'Pallet gỗ linh hoạt, bưu phẩm, hàng đóng kiện (6 - 8 Pallet tiêu chuẩn)',
    targetProduct: 'Foton Aumark S70 & S70L',
    targetProductSpecs: 'Tải 6.5T (S70 thùng 5.2m) / Tải 7.5T (S70L thùng 6.3m), Động cơ Cummins ISF3.8, Hộp số ZF Đức',
    competitors: 'JAC N650 Plus (máy Cummins tầu), Thaco Ollin S720 (máy Yuchai)',
    painPoints: 'Giá đầu tư Foton cao hơn Ollin gần 80 triệu; Sức bền dầm chassis gánh cao tải; Lo sụt giá xe cũ; Cần tư vấn đúng dòng S70 hay S70L cho ngõ cảng hẹp.',
    intro: 'Chào cậu em. Đội xe bưu phẩm của bốc xếp cảng Hải Phòng đang định lấy thêm xe tải khoảng 7 tấn. Bên em có dòng Aumark S70 và S70L lắp máy Cummins. Nhưng anh thấy Thaco Ollin S720 lắp máy Yuchai rẻ hơn tận 80 triệu, còn JAC N650 Plus cũng xài Cummins mà giá mềm xèo. Em bốc phốt lý do gì khiến anh phải dốc thêm cọc mua Foton không?',
    rounds: [
      {
        customerStatement: '"Mức giá xe Aumark S70 và S70L cao hơn Ollin S720 gần 80 triệu. Em giải trình xem xe em có gì tương xứng tầm giá này?"',
        options: [
          {
            key: 'A',
            text: 'Anh ơi tiền nào của nấy, Thaco Ollin là xe cỏ lắp động cơ Yuchai Trung Quốc chạy tải vài ba năm là máy nhão tã, tốn dầu. Xe Foton bên em dùng hoàn toàn Động cơ Cummins Mỹ, phụ tùng ZF của Đức bền gấp năm lần, đi bứt tốc vượt đèo không xi nhê. Đầu tư Foton là lựa chọn đẳng cấp của nhà xe lớn anh ạ!',
            points: 15,
            closureDelta: 10,
            feedback: '"Cậu chê xe Thaco quá đà rồi, anh xài Ollin mấy khóa dạo vẫn tạm được mà. Động cơ Cummins Mỹ thật hay lắp ráp linh kiện Trung Quốc thế em?"',
            strategyLabel: 'Sales truyền thống - So sánh dìm hàng đối thủ',
            expertExplanation: 'Tránh chê bài trực diện thô thiển đối thủ vì có thể chạm tự ái khách cũ. Hãy dùng FAB: Thay vì bảo "Ollin tồi", hãy dồn sự tập trung vào giá trị cốt lõi của S70/S70L: Hệ thống truyền động Đồng bộ ZF Đức hiệu lực đến 95% và Khung chassis dập nguội cường độ lực 700L nguyên khối siêu bền bỉ.'
          },
          {
            key: 'B',
            text: 'Dạ em hiểu băn khoăn về chi phí đầu tư ban đầu của anh Mạnh ạ. Em xin phân tích góc độ Bài Toán Vận Hành: Sự chênh lệch 80 triệu sẽ được bù đắp hoàn toàn trong vòng 1.5 năm chạy đầu tiên. Động cơ Cummins ISF3.8 kết hợp với Hộp số ZF danh tiếng của Đức tối ưu nhiên liệu, tiết kiệm tối thiểu 1.5 - 2 Lít dầu/100km so với động cơ Yuchai. Ngoài ra sườn gầm Aumark S70/S70L được dập nguội nguyên khối kẹp kép dầm dầy chịu lực, giúp anh Mạnh cõng tải nặng không bao giờ võng chassis tạo nứt thùng. Đi kèm là gói bảo hành Vàng 5 năm/200.000km chứng minh chất lượng số 1 của bên em.',
            points: 30,
            closureDelta: 25,
            feedback: '"Lập luận toán kinh tế tiêu hao dầu và khấu hao gầm rất chặt chẽ! Gói bảo hành 5 năm của Foton thực sự làm anh an tâm hơn vì JAC hay Ollin chỉ dám bảo hành tối đa 3 năm."',
            strategyLabel: 'TVBH Chuyên Nghiệp - Áp dụng Toàn Diện Kinh Tế và Chứng Minh FAB',
            expertExplanation: 'Tuyệt vời! Việc quy đổi chênh lệch đầu tư thành toán kinh tế tiết kiệm dầu hàng năm đánh trúng tâm lý nhà xe Logistics Logistics. Bảo hành 5 năm là cam kết vàng đắt giá củng cố niềm tin tuyệt đối.'
          },
          {
            key: 'C',
            text: 'Để tạo điều kiện cho bên mình, em cam kết cắt bớt hoa hồng của em để chiết khấu bớt cho anh Mạnh 10 triệu tiền cọc ạ. Bên em cũng hỗ trợ anh làm trả góp ngân hàng lãi tốt gánh 80% giá trị xe dọn đường thủ tục luôn, anh chỉ cần trả trước nhỉnh trăm triệu là cẩu xe về Thủy Nguyên chạy luôn nhé anh.',
            points: 5,
            closureDelta: 15,
            feedback: '"Giảm thêm 10 triệu thì cũng tốt, nhưng bài toán khấu hao lâu dài của 12 chiếc xe bên anh quan trọng hơn vài triệu lẻ trước mắt. Cậu giải thích kỹ về xe đi đã nào."',
            strategyLabel: 'Sales Giảm Giá - Chiết khấu vặt bớt hoa hồng',
            expertExplanation: 'Chiến thuật giảm giá vội vã hạ thấp giá trị sản phẩm và làm giảm vị thế của TVBH chuyên nghiệp. Khách hàng doanh nghiệp quan tâm đến bài toán chi phí vận hành (TCO), vòng đời xe và độ bền dẻo dai của gầm bệ hơn một khoản giảm lẻ tẻ.'
          }
        ]
      },
      {
        customerStatement: '"Hiện tại đội xe của anh gom hàng từ các khu công nghiệp phụ trợ, chủ yếu đóng trong Pallet gỗ bốc xếp bằng xe nâng. Anh nên chọn S70 thùng 5.2m hay S70L thùng 6.3m?"',
        options: [
          {
            key: 'A',
            text: 'Theo em anh lấy S70L thùng dài 6.3m là chuẩn bài nhất! Vì với kích thước lòng thùng này, anh xếp vừa khít 2 hàng dọc mỗi hàng 3 Pallet gỗ tiêu chuẩn (loại 1.1m x 1.1m), tổng cộng gom thẳng thừng được 6 Pallet/chuyến xe mà không thừa thiếu một khoảng tấc nào. Đoạn gầm thùng dài cũng bốc được hàng bưu kiện cồng kềnh hiệu suất cước cao vượt bậc.',
            points: 30,
            closureDelta: 30,
            feedback: '"Tư vấn chuẩn chỉ luôn! 6 Pallet là bài toán gom hàng hằng ngày của bên anh. S70L hoàn toàn vừa khít chuẩn thông số bưu phẩm gỗ bốc dỡ nhanh bằng xe nâng."',
            strategyLabel: 'Tư Vấn Thấu Hiểu Quy Cách Hàng Hóa - Khớp Thông Số Thực',
            expertExplanation: 'Khách hàng bọc pallet cần đo đếm chuẩn số lượng. S70L có lòng thùng dài 6.3m và rộng 2.25m xếp vừa khít 6 pallet (mỗi pallet 1.1m x 1.1m). Giải pháp này giúp bốc xếp tự động tốc độ, tối ưu quy trình logistics cảng.'
          },
          {
            key: 'B',
            text: 'Anh cứ mua đại bản nào cũng được anh ơi. Thùng 5.2m gọn gàng đi ngõ Thủy Nguyên dễ, còn thùng 6.3m chở nhiều hơn xíu. Nếu ngân sách anh không lăn tăn thì mua bản 6.3m cho sướng, thùng dài bao giờ cũng oách hơn.',
            points: 10,
            closureDelta: 5,
            feedback: '"Tư vấn thế này chung chung quá. Anh cần số liệu tính thực tế để xem xe có hiệu năng gấp gáp cước vận tải không chứ."',
            strategyLabel: 'Sales Mong Manh - Tư vấn hời hợt rủi ro',
            expertExplanation: 'Sales hời hợt làm mất cơ hội chốt. Cần phải thể hiện là chuyên gia vận tải bằng cách thuộc nằm lòng kích thước lòng thùng và quy cách đóng bọc lọt lòng pallet xi măng bưu phẩm.'
          },
          {
            key: 'C',
            text: 'Anh dứt khoát chọn S70 bản thùng ngắn 5.2m nhé. Đi ngõ hẹp ở bến bãi Thủy Nguyên lách luồn cực nuột. Thùng dài 6.3m đi phố rất vướng bách và khó căn sườn gầm khi bo cua sát mép bờ rạch cảng.',
            points: 15,
            closureDelta: 10,
            feedback: '"S70 gọn thật cơ mà anh tính toán lại thấy chở 4 Pallet bị thừa chỗ mà bọc 6 Pallet lại thiếu. Để xem dòng S70L có quá cồng kềnh như cậu nói không."',
            strategyLabel: 'Sales Một Chiều - Cố định hướng khách vào sản phẩm dễ bán',
            expertExplanation: 'Mặc dù tính linh hoạt ngõ hẻm là ưu điểm của S70 gọn nhẹ, việc phớt lờ tiêu chí cước pallet của vận tải logistics khiến khách hàng thấy không khớp nhu cầu thực tế.'
          }
        ]
      },
      {
        customerStatement: '"Nghe nói xe Foton dòng S này xài Động cơ Aucan hoặc Cummins nhưng lại đi kèm Hộp số ZF của Đức. Tại sao không xài hộp số nội địa Trung Quốc cho rẻ?"',
        options: [
          {
            key: 'A',
            text: 'Dạn em xin chia sẻ là ZF là Tập đoàn truyền động danh tiếng hàng đầu của Đức chuyên gá cho xe sang BMW, Audi và xe tải nặng hạng siêu sang. Hộp số cơ khí ZF 6 cấp (6S500/6S600) vỏ hợp kim nhôm tản nhiệt cực nhanh, hiệu năng truyền tải mô-men xoắn đạt 95% (hộp số thường chỉ đạt 85-88%). Có nghĩa là toàn bộ sức dũng mãnh 168 mã lực của động cơ Cummins được truyền thẳng xuống cầu xe không hao phí, giúp xe leo đèo khoẻ, tiết kiệm dầu, tăng số rơ ngọt lịm không gặp cảnh kẹt dĩa ly hợp.',
            points: 30,
            closureDelta: 25,
            feedback: '"Giải thích động cơ đồng bộ hộp số ZF Đức rất sướng tai! Điểm này JAC xài hộp số đồng bộ nội địa kém hiệu quả rõ rệt."',
            strategyLabel: 'TVBH Chuyên Nghiệp - Thuyết minh chuỗi giá trị đồng bộ',
            expertExplanation: 'Khai thác tối đa thế mạnh "Động cơ Cummins + Hộp số ZF" là chìa khóa hủy diệt đối thủ cùng tải trọng. Hộp số ZF Đức rơ số nhẹ, vỏ nhôm tản nhiệt nhanh bảo vệ nhớt hộp số tối đa.'
          },
          {
            key: 'B',
            text: 'Dạ hộp số Đức thì oách và nịnh tay lái thôi anh, chứ thực ra chạy tải nặng như nhau cả thôi. Hãng lắp sẵn linh kiện cao cấp từ nhà máy Foton quốc tế để định giá phân khúc sang trọng cho đẹp đội hình ạ.',
            points: 5,
            closureDelta: 5,
            feedback: '"Thế hóa ra là lắp cho sang chứ không tăng hiệu năng à cậu? Mình bỏ thêm tiền tấn để mua cái đồ nịnh tai thôi sao?"',
            strategyLabel: 'Sales Hạ Thấp Giá Trị - Buông xuôi lý luận',
            expertExplanation: 'Hạ thấp vai trò hộp số ZF là sai lầm chết người. Hộp số là xương sống truyền tải của dòng xe, đặc biệt dòng tải bửng trung cần leo dốc, chở nặng bốc xếp thường xuyên.'
          },
          {
            key: 'C',
            text: 'Dạ hộp số ZF Đức giúp xe nâng cao tuổi thọ của bộ truyền động. Anh Mạnh chạy xe này thì cứ yên tâm 5 năm không cần thay dầu số, bền bỉ tuyệt đối gánh tải vượt trội hoàn toàn các hộp số của xe khác trên thị trường.',
            points: 15,
            closureDelta: 10,
            feedback: '"Hộp số nào mà 5 năm không cần bảo dưỡng thay dầu số hả em? Cậu này chém gió hơi quá đà rồi đấy."',
            strategyLabel: 'Sales Phóng Đại - Đưa tin sai kỹ thuật',
            expertExplanation: 'Tránh thông tin sai kỹ thuật (hộp số dù tốt vẫn cần thay nhớt định kỳ theo km lái). Sales chuyên nghiệp giữ chân thật để tạo sự uy tín bền vững.'
          }
        ]
      },
      {
        customerStatement: '"Bên JAC N650 Plus họ cam kết xe giữ giá tốt và bán lại cực dễ vì thương hiệu họ bám rễ lâu. Bên Foton Aumark gầm cao giá đắt này bán lại liệu có bị lỗ sâu không?"',
        options: [
          {
            key: 'A',
            text: 'Anh Mạnh ơi, xe tải giữ giá hay không phụ thuộc 100% vào Sức Sống Động Cơ và Chất Lượng Chassis sau nhiều năm cày cước. Đối với Foton, nhờ Động cơ Cummins thuần kết hợp Chassis dập nguội nguyên khối tĩnh điện chống ăn mòn hóa chất cực tốt, sắt xi không bị gỉ sét sọ vách gầm như xe dập nóng. Khi anh Mạnh sang nhượng lại sau 3-5 năm, cabin và sườn Chassis vẫn còn đét cứng cáp, máy nổ êm tròn dập tua dẻo dính không khói đen. Giới lái xe cũ tranh nhau mua Foton vì gầm sườn chắc nịch, định giá thanh lý luôn cao hơn JAC từ 15 - 20%!',
            points: 30,
            closureDelta: 30,
            feedback: '"Phụ khoa gầm bệ và chassis tĩnh điện dập nguội đúng là then chốt của xe cũ. Anh đi xem nhiều bãi xe cũ thấy JAC sườn sắt xi hay bị mọt tơi rộp thật, Foton bệ vệ chắc chắn hơn."',
            strategyLabel: 'TVBH Đẳng Cấp - Tư vấn dựa trên vòng đời xe TCO',
            expertExplanation: 'Chuyên nghiệp tuyệt đỉnh! Sức sống gầm bệ chassis dập nguội cường độ lực 700L nguyên khối và công nghệ gõ sơn tĩnh điện tột bậc của Foton đảm bảo tuổi thọ khấu hao dài lâu, nâng tầm giá trị bán lại vượt trội.'
          },
          {
            key: 'B',
            text: 'Anh yên tâm đi xe Foton nhà em độc quyền bán sỉ nên không có chuyện lo lỗ đâu anh ơi. Toàn đại gia tay chơi miền Bắc đổ dòng này chở hải sản với bưu phẩm, thương hiệu định vị hoàng gia sẵn rồi anh.',
            points: 10,
            closureDelta: 10,
            feedback: '"Cậu nói chuyện nghe bay bổng quá. Đại gia hay nhà xe cỏ thì đồng tiền mồ hôi nước mắt đều phải tính kỹ từng đồng lỗ lãi sang nhượng cậu ơi."',
            strategyLabel: 'Sales Nịnh Hót - Nói suông không số liệu chứng minh',
            expertExplanation: 'Lý thuyết suông hoặc nịnh nọt vị thế không lay chuyển được các ông chủ vận tải lão luyện miền Bắc. Họ cần sự bảo chứng về sườn sắt xi không rỉ sét và sức kéo dầm gá tải.'
          },
          {
            key: 'C',
            text: 'Dạ nếu anh lo lỗ thì em khuyên anh lấy xe đời cũ hơn hoặc mua xe bãi thanh lý chạy tạm cho yên tâm đỡ hao mòn giá tiền đầu tư ban đầu anh nhé.',
            points: 5,
            closureDelta: 5,
            feedback: '"Anh đang tính mua xe mới nâng tầm đội xe bưu chính phục vụ đối tác ký kết dài kỳ cảng bến mà cậu lại bàn lùi rủ mua xe bãi cũ là thế nào?"',
            strategyLabel: 'Sales Bàn Lùi - Đẩy khách sang dòng xe cỏ khác',
            expertExplanation: 'Sales bàn lùi thể hiện sự thiếu tự tin vào sản phẩm cao cấp chính mình bán. Hãy kiêu hãnh củng cố cho khách hàng thấy đầu tư Foton là khoản đầu tư thông minh, bớt tiền sửa chữa dọc tuyến đường.'
          }
        ]
      }
    ]
  },
  {
    id: 'ha-sonla',
    customerName: 'Chị Nguyễn Thị Hà',
    avatarBg: 'bg-amber-100 text-amber-800 border-amber-200',
    badge: 'Chủ Vựa Trưởng Lâm Nông Sản',
    location: 'Mộc Châu, Sơn La',
    role: 'Vận chuyển nông sản dốc (mận, ngô, dâu)',
    cargo: 'Chở nông sản đổ đèo dốc hiểm, cõng vượt tải (hoạt động dốc đứng)',
    targetProduct: 'Foton Aumark S70L',
    targetProductSpecs: 'Tải 7.5T, Thùng mành mành thoáng dài 6.3m bọc cước tiện lợi, máy Cummins 168HP dũng mãnh, Phanh khí nén ABS vượt đèo dốc dài dã chiến',
    competitors: 'Xe Tải Thaco Ollin ráp Yuchai dột sườn, Hyundai Mighty 110SP máy cơ hao dầu',
    painPoints: 'Lo mòn phanh mất kiểm soát văng cua dốc Sơn La; Máy Cummins leo dốc tốn dầu hơn xe máy cỏ Weichai cơ; Cần tải 7.45T thoải mái gom mận cướp mùa không bị phạt quá tải bến bãi lân cận.',
    intro: 'Chào em, chị là Hà chủ vựa mận chín ở ngực đồi Mộc Châu. Hôm bữa xe chạy chuyển hàng dốc đèo Pha Đin dột cầu dầm tụt ghê quá lo thắt tim. Chị đang nhắm con Aumark S70L (7.5T) thùng lửng phủ mành mành bọc cước nông sản bên em. Nhưng đi rừng dốc Sơn La cua gấp chở mận nặng mười mấy tấn dồn góc nghiêng, phanh lốc kê hơi xe em có kít bám cua dính không? Nghe đồn máy Cummins dột cước leo dốc nuốt dầu cực bặm?',
    rounds: [
      {
        customerStatement: '"Xe chị chở mận hậu dồn tấn dạt đuôi cua bám ngập sình, phanh lốc kê hơi bổ trợ ABS của Foton S70L đổ đèo hiểm dốc Sơn La có an toàn tuyệt đỉnh như quảng cáo?"',
        options: [
          {
            key: 'A',
            text: 'Chị Hà cứ yên tâm, dòng Aumark S70L bên em sinh ra phù hợp 100% cung đèo dốc Tây Bắc. Xe thiết kế hệ thống phanh khí nén hơi lốc kê toàn phần trợ lực kép nén xả, phối hợp chuẩn chỉ hệ thống chống bó cứng phanh ABS giúp bánh xe luôn bám dính bêtông khi phanh ngập đèo dốc trơn, chống hiện tượng văng đuôi rê sườn dạt ngách của dòng xe cỏ dập cầu cũ. Đặc biệt còn tích hợp hệ thống Van điều hòa lực phanh tự động theo tải trọng thực tế giúp lực phanh tác động êm không giật sượng sườn lật mận.',
            points: 30,
            closureDelta: 25,
            feedback: '"Có ABS bám lốp dẻo dính chống lật sườn là chị ưng cái bụng rồi đó. Dốc Mộc Châu chạy đêm sương mù mà phanh sượng sùng dột đuôi ghê chết đi được."',
            strategyLabel: 'TVBH Chuyên Nghiệp - Thuyết minh chi tiết An Toàn Phanh Khí Nén ABS',
            expertExplanation: 'An toàn phanh là mối quan tâm sinh mệnh của tài xế đèo dốc Sơn La. Cần nhấn mạnh tính đồng bộ của phanh lốc kê nguyên bản tích hợp phanh khí xả (Cup-pô trợ lực đổ đèo bớt cháy má phanh) + van điều hòa lực phanh chống rê trượt văng sườn gầm.'
          },
          {
            key: 'B',
            text: 'Dạ chị cần đổ đèo an toàn thì cứ kéo phanh tay rà rà liên tục dốc xuống là được ạ. Với cả xe bên em cabin cứng cáp dầy chịu va đập đét, lỡ có chạm tay lái bốc vách đất thì cabin dập cứng chống co nộp bảo vệ bác tài tốt lắm chị.',
            points: 5,
            closureDelta: 5,
            feedback: '"Cậu tư vấn lỡ đâm va đầu cabin gân cốt cứng cáp nộp bẹp thế nghe tàn độc quá vậy em. Chị cần phanh chuẩn chống tai nạn chứ lỡ đâm va rồi sườn nhám làm gì!"',
            strategyLabel: 'Sales Hồn Nhiên - Đưa lập luận rùng rợn phản tác dụng',
            expertExplanation: 'Tư vấn sai sọc kỹ thuật (kéo rà phanh lốc kê liên tục cháy guốc phanh bó bùng) và gợi ý rủi ro va chạm cabin sập đầu khiến khách nghi ngờ về năng lực an toàn thật.'
          },
          {
            key: 'C',
            text: 'Dạ phanh hơi xe em thì thuộc loại kít chết đứng bánh xe luôn chị ạ. Chị cứ dẫm phanh lút sàn giữa đèo dốc sơn mài là đứng im xe dính lốp xe luôn ngay tắp lự khỏi lo láng cua văng sườn.',
            points: 15,
            closureDelta: 10,
            feedback: '"Dẫm phanh gấp đứng khựng sột đứng giữa dốc dạt đuôi lộn lật nguyên con xe chở mận mán xuống suối thì có mà chết người hả em?"',
            strategyLabel: 'Sales Phóng Đại - Tư vấn nguy hiểm thiếu kiến thức dốc lượn',
            expertExplanation: 'Trên đèo dốc chở nặng, phanh kít chết đứng bánh đột ngột cực kỳ nguy hiểm vì lực quán tính sẽ gây lật xe. Xe Foton S70L kết hợp van điều hòa lực phanh mọc tơi giúp phân phối đều lực phanh mượt ngọt dẻo chống lẫy.'
          }
        ]
      },
      {
        customerStatement: '"Nghe đồn máy Cummins 3.8L lắp Foton S70L háu khỏe thì tốn dầu hơn dòng máy cơ dột cũ hoặc xe ráp máy nhí dòng khác gá bửng. Chị dân buôn mận, lời lãi cước vận chuyển tính từng lít xăng dầu!"',
        options: [
          {
            key: 'A',
            text: 'Chị ơi xe khoẻ dũng dực mã lực tới 168HP thì đương nhiên dứt khoát tốn dầu rồi chị Hà. Muốn ăn cước nhanh cõng tải mận dốc vạy vượt chặng vội thì tốn dầu xíu có gì băn khoăn hả chị, bù lại thời gian chở cước lẹ rút ngắn chuỗi thối mận hư củ.',
            points: 10,
            closureDelta: 10,
            feedback: '"Uầy cậu nói thế xe nuốt dầu rỉ rả ngày chạy đêm bặm thâm thủng hết sạch tiền cước của chị buôn sỉ rồi chứ lị."',
            strategyLabel: 'Sales Thỏa Hiệp - Thừa nhận tốn dầu lệch tư duy',
            expertExplanation: 'Không nên đồng ý tốn dầu dột sườn. Động cơ Cummins ISF3.8 thế hệ mới tích hợp phun dầu điện tử Common Rail áp suất cực cao bốc sương tột độ, đốt cháy sạch sẽ hoàn toàn giúp tối ưu nhiên liệu.'
          },
          {
            key: 'B',
            text: 'Dạ chị Hà đứng góc độ khoa học: Động cơ Cummins ISF3.8 trên S70L sử dụng công nghệ Phun nhiên liệu điện tử trực tiếp đa điểm Common Rail kiểm soát bằng ECU Bosch của Đức siêu chính xác từng miligiay nổ dập tua. Với mô-men xoắn phẳng trùm dải rộng 500 Nm ngay từ tua máy sớm 1.300 vòng/phút, xe leo đèo ở số cao mượt mà không cần ép rú ga dột dốc gào máy làm lãng phí nhiên liệu xả khói đen. Thực tế nhà xe bọc cước Sơn La chạy Foton S70L ghi nhận lượng tiêu thụ cực kỳ tiết kiệm: chỉ khoảng 12.5 - 13.5 Lít dầu / 100km chạy đủ tải, tiết kiệm hơn dòng xe máy cơ cũ tốn tới 15.5 Lít/100km đó chị.',
            points: 30,
            closureDelta: 25,
            feedback: '"À! Công nghệ máy kim phun điện tử Common Rail tua máy sớm gồng mô-men xoắn phẳng 500Nm thì đúng là leo bốc dải trớn dầm nhẹ, không cần giật ép số rú ga nên bớt nuốt dầu."',
            strategyLabel: 'TVBH Chuyên Nghiệp - Thuyết minh thông số kỹ thuật tối ưu Common Rail',
            expertExplanation: 'Thuyết minh chuẩn xác công thức cấu tạo sườn Cummins bứt phá mô-men xoắn phẳng rộng giúp gánh tải không gằn rú dập tua, tối ưu kinh tế cho dòng S70L chở nông sản.'
          },
          {
            key: 'C',
            text: 'Chị Hà ơi dứt khoát không tốn dầu ạ! Máy Cummins Mỹ siêu công nghệ nên lết đèo dốc chở mười hai tấn mận chỉ tốn ngang chiếc xe con con 8 lít dầu thôi chị yên tâm cọc xe ngay tối nay đi chị.',
            points: 5,
            closureDelta: 5,
            feedback: '"Chém gió dữ dằn quá! Xe tải trung tải trọng 7.5 tấn xác to gồng leo dốc hàng dột tấn dạt sườn mà cậu chém 8 lít dầu thì có mà nổ bùng tơi sạt nghiệp sales."',
            strategyLabel: 'Sales Chém Gió - Cam kết hoang đường rủi ro pháp lý',
            expertExplanation: 'Tuyệt đối tránh chém gió chỉ số tiêu hao cực đoan hoang đường (8L/100km cho xe tải trung gánh tải dốc). Làm bốc hơi uy tín tức thì đối với chủ vựa mận sành dốc đường đèo.'
          }
        ]
      },
      {
        customerStatement: '"Xe Foton S70L này tải đăng kiểm thùng mành thiết kế chở được bao nhiêu tấn mận, lỡ gặp trạm cân bến bãi nạp phạt quá tải dọc tuyến Quốc Lộ 6 thì mệt óc sập tiệm?"',
        options: [
          {
            key: 'A',
            text: 'Dạ Aumark S70L có Tổng tải trọng thiết kế đăng ký đăng kiểm lên tới 11.990 kg, trong đó tải trọng hàng hóa hữu ích được phép chở lưu hành hợp pháp lên tới 7.450 kg (7.45 tấn mận mọc tơi). Lòng thùng mành của xe S70L được tối ưu dài tới 6.3m giúp chị Hà đóng bao nông sản gọn khít sọt gỗ cực dạt. Với tải đăng kiểm cao rực rỡ này, chị vô tư cõng cước mận căng đầy rầm cầu hợp pháp chạy băng băng Quốc Lộ 6 từ Sơn La về Hà Nội qua các cung trạm cân dội bãi mà không lo bị tuýt còi phạt gông cổ sạt nghiệp nhé chị.',
            points: 30,
            closureDelta: 30,
            feedback: '"Tải đăng kiểm 7.45 tấn thùng dài 6.3m bao phủ cước bốc xếp nông sản dẻo dai thì chị khỏi lo lót tay phạt bến bãi ròng rã dội cước nữa rồi."',
            strategyLabel: 'TVBH Thấu Hiểu Pháp Lý Vận Tải - Cung cấp thông thạo tải trọng',
            expertExplanation: 'Đưa đúng tải trọng 7.45T giúp khách hàng bọc nông sản hiểu xe S70L mang lại lợi thế vận hành hợp pháp, bớt gánh nặng tâm lý bị phạt cân gạt tải cung đường dóc QL6.'
          },
          {
            key: 'B',
            text: 'Bản S70L này tải đăng kiểm 7.45 tấn nhưng gầm gá dầm láng gá chassi dày cõng cướp vượt tải 16 - 20 tấn mận chín vô tư chị ơi. Gặp trạm cân dột bãi bến thì chị cứ chạy đêm né giờ hành chính là trôi chảy tuốt lết bạt tử lướt sóng.',
            points: 5,
            closureDelta: 10,
            feedback: '"Giục tài xế chạy né giờ hành chính bạt mạng đèo đêm mất lái thì lo đứng sọ óc dột gầm. Chị cần kinh doanh đàng hoàng tử tế pháp lý an nhàn bền chân chở chứ."',
            strategyLabel: 'Sales Xúi Dục Rủi Ro - Coi thường luật an toàn vận tải',
            expertExplanation: 'Nghiêm cấm xúi giục khách hàng cõng vượt tải quá đà bạt mạng né trạm cân dột bãi bửng. Sales đẳng cấp định hướng kinh doanh bền vững, an tâm pháp lý gầm bệ an toàn dài hạn.'
          },
          {
            key: 'C',
            text: 'Dạ xe tải đăng kiểm tầm 7 tấn chị ạ. Thùng mành dài 6.3m búa xua thì cõng dã chiến tầm 8 tấn mận thôi chị nhé. Cứ gá đại chạy lết sườn láng cầu mộc mạc xe bền bỉ Cummins gân thép chị ơi.',
            points: 15,
            closureDelta: 15,
            feedback: '"Nói tầm 7-8 tấn chung chung thế báo thông số mộc mạc làm chị lo lắng, lỡ cơi bọc mọt sọt sạt lề không rõ tải trọng gồng cân đè phạt thì sao em?"',
            strategyLabel: 'Sales Trực Giác Mơ Hồ - Thiếu chuẩn chỉnh số liệu',
            expertExplanation: 'Thiếu chuẩn chỉnh tải đăng kiểm pháp định là dấu hiệu nghiệp vụ yếu kém. TVBH phải thuộc lòng S70L đăng kiểm tải trọng thực tế 7.450 kg để khớp đúng nhu cầu pháp lý vận hành.'
          }
        ]
      },
      {
        customerStatement: '"Chị nghe bên Thaco họ khoe trạm bảo dưỡng họ bạt ngàn ngõ Bắc, hỏng hóc xe cỏ ghé sửa ngay. Foton do Thaco nhập phân phối gá linh kiện Cummins phụ tùng này lỡ hỏng ở dốc sạp đèo Sơn La thì chị gọi ai gánh vác?"',
        options: [
          {
            key: 'A',
            text: 'Chị ơi hãng Foton Aumark dòng S cao cấp này được Thaco Trường Hải độc quyền phân phối lắp ráp, bảo hành bảo dưỡng sửa chữa gá bửng CHUNG TOÀN MIỀN HỆ THỐNG TRẠM THACO toàn quốc bạt ngàn ngách tỉnh! Từ Lai Châu, Sơn La dọc bến QL6 đều có trạm dịch vụ 24/7 của Thaco gánh vác. Phụ tùng máy Cummins và hộp số ZF được dự trữ dồi dào nguyên bản chính hãng giá xưởng sành điệu. Lỡ xe gặp sự cố nhỏ dọc eo dốc, chị chỉ cần gọi hotline, xe cứu nạn kỹ thuật lưu động Thaco Sơn La phi thẳng ứng cứu cứu thùng hàng mận căng đét của chị ngay dầm cua!',
            points: 30,
            closureDelta: 30,
            feedback: '"Ối dào vậy là xe Foton sửa chữa chung hệ thống Thaco khổng lồ luôn hả em? Thế thì chị sướng bụng rồi, cứ sợ mua hãng lạ lỡ nằm đường đèo sương mốc bách đất rụng hết mận chín."',
            strategyLabel: 'TVBH Chuyên Nghiệp - Khai thác thế mạnh Hệ thống Dịch vụ Thaco toàn quốc',
            expertExplanation: 'Giải tỏa lo lắng nằm đường của đại lý nông sản dốc lớn. Foton thừa hưởng hệ thống xưởng dịch vụ sữa chữa Thaco trải rộng 63 tỉnh thành, phụ tùng Cummins chính hãng vô bờ bến đập tan nỗi sợ lưu hành đèo xa.'
          },
          {
            key: 'B',
            text: 'Chị lo xa quá, máy Cummins bền nức tiếng Mỹ chả hỏng bao giờ đâu chị gá dầm gầm chạy phé phé 10 năm chỉ việc đỏ nước lã chạy mát máy. Khi nào rảnh cả năm ghé đại trạm vỉa hè nào thợ cỏ họ bắt mạch ngoáy tua vít sửa loáng cái xong liền hà.',
            points: 5,
            closureDelta: 5,
            feedback: '"Máy Cummins dực công nghệ đời cao phun điện tử hộp số Đức mà đưa cho thợ vỉa hè thọc tua vít ngoáy hỏng bung mạch điện của chị thì khóc tiếng Mán hả em?"',
            strategyLabel: 'Sales Chủ Quan - Xem nhẹ chu kỳ kỹ thuật phức tạp',
            expertExplanation: 'Động cơ Common Rail hiện đại và hộp số ZF chất lượng Đức tuyệt đối không thể sửa chữa tùy tiện bằng thợ vỉa hè kém tay nghề. Phân tích rõ sự nghiêm cẩn trong nghiệp vụ bảo dưỡng chính hãng tạo uy lực đẳng cấp sales.'
          },
          {
            key: 'C',
            text: 'Dạ bên em có đại lý gửi phụ tùng bưu phẩm nhanh từ Hà Nội lên Sơn La tầm 2-3 ngày là chị nhận được đồ thay thế ngay chị nhé. Đoạn hỏng chị cứ thuê xe ba gác kéo vào lề dốc lánh tạm rồi chờ đồ lên lắp rơ ngọt luôn.',
            points: 10,
            closureDelta: 10,
            feedback: '"Hàng mận sọt 2 ngày nằm lề vệ dốc bốc sương sình ủng ủng thối sạch cuống bốc mùi dột hàng rụng trắng cả tỷ bạc của hợp tác xã nhà chị đấy dập cước ơi!"',
            strategyLabel: 'Sales Chắp Vá - Đưa giải pháp cẩu thả bộc lộ điểm yếu logistics',
            expertExplanation: 'Giải pháp chắp vá bộc lộ thiếu đầu tư hệ thống logistics. Chủ vựa nông sản cước chạy giờ vàng ghê sợ trễ giờ sập tải hỏng mận úa tươi.'
          }
        ]
      }
    ]
  },
  {
    id: 'mai-quangninh',
    customerName: 'Chị Vũ Hoàng Mai',
    avatarBg: 'bg-rose-100 text-rose-800 border-rose-200',
    badge: 'Chủ Vựa Hải Sản Vân Đồn',
    location: 'Cẩm Phả, Quảng Ninh',
    role: 'Vận chuyển thủy hải sản tươi ngập đá mặn',
    cargo: 'Hải sản đông lạnh rò rỉ nước mặn muối xót gầm sườn',
    targetProduct: 'Foton Wonder 990kg',
    targetProductSpecs: 'Xăng DAM16NS 1.6L, 118HP, nhíp gánh cầu sau, cabin sơn tĩnh điện điện di sâu, phanh ABS chống trượt phố ngõ hẹp',
    competitors: 'Teraco Tera 100S rẻ hơn 25 triệu xài máy Mitsubishi cũ 92HP',
    painPoints: 'Nước mắm muối rỉ sườn mục mục sắt xi; Chênh lệch 25 triệu đồng so với xe cỏ cạnh tranh; Chạy phố dốc Quảng Ninh bốc dỡ.',
    intro: 'Chào chú sales nhé! Chị buôn sỉ hải sản đông bọc đá sương từ bến Vân Đồn đi khắp các chợ ngõ Quảng Ninh. Nước mặn muối lạnh rỉ ra từ thùng xe ròng ròng xót buốt gầm bệ liên tục, xe cũ của chị xài dăm năm sườn chassi bục mủn ra rụng mất cả cầu sau ghê chết đi được. Chị đang nhắm con Foton Wonder bốc xăng. Bên cạnh nhà khuyên lấy Tera 100S rẻ hều hơn hẳn 25 triệu chạy tạm. Chú phân tích xem Foton Wonder bên chú gầm sườn sơn xi có cự bệt được rỉ sét rò rỉ và công nghệ bứt tốc có đáng cái 25 triệu dôi dư kia không nhé?',
    rounds: [
      {
        customerStatement: '"Xe Tera 100S rẻ hơn Foton Wonder tận 25 triệu sắm được khối đá đông lạnh. Xe em gầm cabin bệ sườn sơn dập thế nào dập rạp cái rỉ sét muối biển của Vân Đồn?"',
        options: [
          {
            key: 'A',
            text: 'Dạ chị Mai ơi, 25 triệu chênh lệch nằm ở Đỉnh Cao Luyện Thép & Công Nghệ Sơn tĩnh điện di chất lượng cao của Foton. Chassis xe Foton Wonder được dập nguội nguyên khối áp lực cao, sau đó toàn bộ sườn gầm cabin được nhúng chìm 100% điện di EDM chống rỉ sét đa tầng. Nước muối mặn rỉ xuống bám hông chỉ nằm trơ mặt ngoài chứ không thể ngậm thấm ăn mòn thớ thép của Foton được. Xe đối thủ dập nóng bằng thép thường, sơn phun mỏng cầm cự một mùa đông đá mặn là rỗ mọt rụng bửng ngay tắp lự. Chị bớt lo khoản mục gầm cứu nguy ráo ròng!',
            points: 30,
            closureDelta: 25,
            feedback: '"Sơn nhúng chìm điện di EDM sâu cả khối dập nguội thì vững tâm rồi. Trùm buôn cá như chị ngán nhất sập gãy nhíp gầm dột nhớt muối rỉ sắt."',
            strategyLabel: 'TVBH Đẳng Cấp - Thuyết minh chi tiết công nghệ luyện kim và EDM nhúng chìm',
            expertExplanation: 'Khách hàng ngành hải sản rỉ nước muối sợ nhất ăn mòn hóa học sắt xi gầm sườn. Thuyết minh rõ quy trình dập nguội cường độ cao và sơn nhốt tĩnh điện di sâu (EDM - Electro Deposition) là phép hóa giải rào cản tài chính xuất sắc.'
          },
          {
            key: 'B',
            text: 'Chị dán màng bọc nilon bọc kín Chassis hoặc quệt dầu tra mỡ bò mỏng lên gầm sườn mỗi tháng là xe đối thủ Tera hay Foton đều gánh được mặn rỉ tuốt chị ơi, chả cần tốn thêm những 25 triệu mua Foton của tụi em làm gì cho phí tiền ạ.',
            points: 5,
            closureDelta: 5,
            feedback: '"Cậu sales này bói toán bàn lùi làm sao thế nhỉ? Chạy xe cá ngập nước liên miên đóng bùn mặn, làm sao chui gầm trét mỡ bò ròng rã suốt ngày hả chú?"',
            strategyLabel: 'Sales Bàn Lùi - Đưa giải pháp thủ công tồi tàn tốn sức',
            expertExplanation: 'Tư vấn mang tính báng bổ giải pháp thủ công kém vệ sinh, bỏ qua ưu thế cạnh tranh bộc lộ sự thiếu am hiểu và làm hạ vị thế sản phẩm.'
          },
          {
            key: 'C',
            text: 'Dạ bên em Foton Wonder đắt tiền hơn thì chất liệu khung gầm dứt khoát dầy dặn to đùng hơn gấp đôi chị ạ. Nước hải sản rỉ ra thì chị xịt nước máy xịt rửa loáng cái sạch sành sanh không lo mọt gầm sườn sụn đâu chị nhé.',
            points: 15,
            closureDelta: 10,
            feedback: '"Xịt nước máy vỉa hè làm sao trôi hết muối tụ ở kẽ nhíp xếp? Nói dày gấp đôi chả có cơ sở kiểm nghiệm số lượng gì làm chị e ngại hụt cọc."',
            strategyLabel: 'Sales Cảm Tính - Thiếu khẳng định khoa học vật liệu',
            expertExplanation: 'Khách hàng thông thái cần lý giải cơ học (dập nguội không nứt nẻ thớ thép dập nguội) kèm lớp phủ điện di hoá học nhúng bồn xưởng máy Thaco.'
          }
        ]
      },
      {
        customerStatement: '"Tera 100S máy Mitsubishi 92 mã lực bấn phố, Foton Wonder máy DAM16NS 118 mã lực. Công suất to chạy phố luồn lách dốc Quảng Ninh có tốn xăng dập cước chết dở không?"',
        options: [
          {
            key: 'A',
            text: 'Dạ chị Mai thấu suốt: Công suất to hãm dốc không hề tốn xăng mà ngược lại còn Tiết Kiệm Xăng và Bảo Vệ Khớp Chân Ga chị dạt! Động cơ DAM16NS 1.6L phun xăng gá turbo hút bốc cho 118 HP, momen giật 152Nm cực dầy dặn hẹp tua sớm. Đi dốc hòn gai Quảng Ninh chị đi số cao vút máy êm trôi hơ hớ trớn không bị rú ga ghì gầm gào dầu, vòng tua duy trì cực thấp dưới 1.600 rpm. Xe đối thủ Tera 100S máy 1.3L 92HP cõng cá nặng lê dốc dột là lết gác khói bốc ngùn ngụt, tài xế phải ép dậm ga lún sàn số 1 rít lên phun xăng ào ào tốn gấp rưỡi dầu máy đó chị!',
            points: 30,
            closureDelta: 25,
            feedback: '"Lý thuyết vòng tua thấp mượt dốc và mô-men xoắn dầy nghe rất thuyết phục! Con xe cá cũ chị máy 1.1L tụt dốc tài xế dậm rú bóp cổ dã man ăn xăng kinh hồn."',
            strategyLabel: 'TVBH Chuyên Sâu Kỹ Thuật - Sức bốc tối ưu vòng tua tiết kiệm xăng',
            expertExplanation: 'Lật đổ lầm tưởng "máy dung tích lớn = tốn xăng". Nhờ sức kéo dồi dào, xe tải nhỏ Foton lướt đà dốc mượt mà ở vòng tua êm ái, bảo vệ động cơ bền khỏe hơn rất nhiều.'
          },
          {
            key: 'B',
            text: 'Dạ đương nhiên máy 118 mã lực to béo thì dứt khoát uống xăng ừng ực tốn hơn đối thủ rồi chị, nhưng bù lại chạy bốc dập cướp chạy nhanh vượt ẩu lách chợ cá đợt vàng sớm nhanh hơn chị hái bạc ạ.',
            points: 10,
            closureDelta: 10,
            feedback: '"Buôn cá sỉ lời từng ngàn cọc, chạy lạng lách vượt ẩu rủi ro đâm đè nát bét mâm cọc thì chị có mà bán nhà đền nợ à chú sales?"',
            strategyLabel: 'Sales Xúi Dục Nguy Hiểm - Thừa nhận tốn hớ nhiên liệu',
            expertExplanation: 'Chạy lướt ẩu bạo lực là điều rủi ro nghiêm trọng trên đường phố hẹp Quảng Ninh. Hãy định vị sản phẩm bằng sự an tâm, êm trớn, lái vững tinh tường.'
          },
          {
            key: 'C',
            text: 'Dạ Foton Wonder xài xăng sinh học thân thiện nên mức ăn nhiên liệu cũng bấn bấn ngang ngửa xe con thui chị. Chị đi phố cứ tắt máy lạnh thả dốc trôi tự do là cực tiết kiệm gặt hái lộc xu dồi dào luôn nha chị.',
            points: 5,
            closureDelta: 5,
            feedback: '"Trời ơi cá tươi ướp đá rò rỉ ngột ngạt ngách bến b bãi mặn mà chú xui tắt điều hòa dầm nắng Quảng Ninh rộc bẹp phổi chết ngốt mất chú ơi!"',
            strategyLabel: 'Sales Chắp Vá - Đưa giải pháp thiếu thực tế phi lý',
            expertExplanation: 'Điều hòa buồng lái xe cá Quảng Ninh dính mặn cực kỳ quan trọng giúp tài xế giữ sức dẻo dai bốc cước. Tắt điều hòa mang tính cách vớ vẩn rớt deal.'
          }
        ]
      },
      {
        customerStatement: '"Quảng Ninh dột dốc cua nhiều lúc sạt đá mưa giông trơn trượt đổ chợ vội, chiếc Foton Wonder nhỏ bé này bám đường dọn cua thế nào chống xoay xe lật rổ sứa?"',
        options: [
          {
            key: 'A',
            text: 'Chị Mai ơi, Foton Wonder trang bị Hệ phanh bó cứng ABS kết hợp phân phối điện tử EBD vượt cấp duy nhất tải nhẹ bấy giờ! Hệ nhíp xếp gánh cực chịu tải sườn sau tạo thăng bằng lốp cỡ to bám chặt nhựa. Khi phanh gấp tránh sạt đất dốc cua, ABS rung băm nhấp phanh 20 lần/giây gạt mượt mọi vệt bánh trôi rê bánh, giúp tài xế rơ bẻ lái lách vật cản trơn mượt không văng đuôi rê sườn lật đổ rổ cá sứa. Chạy hải sản kịp giờ đấu giá bến đêm mưa giông là tuyệt đối an toàn rực rỡ.',
            points: 30,
            closureDelta: 30,
            feedback: '"Có phanh ABS điều hướng rà cua là an vị tuyệt rồi. Xe con của chị xài ABS bám cua chị hiểu giá trị sinh mệnh này, không ngờ xe tải Wonder chưa tới 200 triệu cũng sẵn hệ thống ABS này."',
            strategyLabel: 'TVBH Uyên Bác - Chuẩn hóa thông điệp tính năng ABS chống văng rê sườn',
            expertExplanation: 'ABS trên Foton Wonder dưới 1 tấn là trang bị vàng hạ gục Teraco 100S không có ABS lết guốc. Nhấn mạnh tính an toàn bảo bối vận tải đêm đông.'
          },
          {
            key: 'B',
            text: 'Dạ cua dốc sạt thì chị bảo tài lái chậm rì 10km/h bò sát bệ vách lề đất cho an toàn dã dượi khỏi lăn tăn phanh phiếc gì chi mệt óc tốn tiền chú ý nhé chị.',
            points: 5,
            closureDelta: 5,
            feedback: '"Bò 10km/h từ Vân Đồn về bến dốc Cẩm Phả mất nguyên ngày thì hải sản mọc sình thối rữa ném bể bỏ muối hết cước em ơi!"',
            strategyLabel: 'Sales Trốn Tránh - Bắt khách nhẫn nhịn hỏng cước vận tải',
            expertExplanation: 'Bắt khách nhẫn nại chậm cước làm hỏng giá trị cốt lõi của vận tải logisitics dải nhanh. TVBH thâu hiểu áp lực kịp bến cá tươi.'
          },
          {
            key: 'C',
            text: 'Dạ xe Wonder cầu sau lốp béo dính nhựa nên cứ cua gạt thoải mái bạt mạng lùi ga không xi nhê gì đâu chị lật xe dột bên em bồi hoàn bảo hiểm thân sườn chị tha hồ phóc cua rột rộng.',
            points: 10,
            closureDelta: 10,
            feedback: '"Bảo hiểm đền xe chứ mạng tài xế xe hỏng lật mương đền sao nổi chú sales bay bổng coi khinh mạng người quá vậy?"',
            strategyLabel: 'Sales Liều Mạng - Ba hoa bất chấp an toàn tính mạng',
            expertExplanation: 'Bất chấp an toàn là điều tối kỵ trong văn hóa bán hàng Thaco Foton. Luôn thuyết minh kiểm soát an toàn chủ động làm rường cột giữ lòng tin bền chặt.'
          }
        ]
      }
    ]
  },
  {
    id: 'hung-laocai',
    customerName: 'Anh Lò Văn Hùng',
    avatarBg: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    badge: 'Chủ Hộ Vận Tải Lào Cai',
    location: 'Cửa khẩu Lào Cai - Sa Pa',
    role: 'Chuyên thầu khoáng sản & quặng xi măng bao',
    cargo: 'Quặng đá sỏi nặng nề, dầm xi măng mọc rơ ổ gà sâu bến mỏ',
    targetProduct: 'Foton Auman C160M 9 Tấn',
    targetProductSpecs: 'Tải 9T, Động cơ Yuchai YC6JA 6 máy 220HP dũng dực khỏe, sườn gầm chassi lồng 2 lớp mác thép 700L dày 8+5mm dập nguội nâng cao sức chịu nén đè',
    competitors: 'Chenglong M3 180HP máy yếu xoắn lùi dốc đèo hiểm núi',
    painPoints: 'Mã lực cõng quặng đèo Sa Pa thụt lùi ghì đà số; Sườn gầm giật gãy chassi do ổ gà dốc núi dập; Phụ tùng Auman C160M nằm biên giới Lào Cai.',
    intro: 'Thầy chào cậu sales nhé, tôi là Hùng chủ hợp tác xã vận tải Lao Cai dầm dốc Sa Pa đây. Đội xe đá quặng và xi măng trần của tôi đợt này rêm gầm vỡ sườn Chassi liên tục vì đập ổ gà bến biên đèo dốc gắt. Tôi đang nghía con Auman C160M 9 tấn máy 220HP 6 xi-lanh dã dã sức gánh bên em. Tụi bạn khuyên múc Chenglong M3 180HP vì giá rẻ dễ lăn. Cậu cân nhắc xem con sườn dầm thép Foton sườn Auman C160M với máy 220 mã sành điệu có gì đè bẹp xẹp được M3 để tôi dốc tiền lấy em nó cày quặng Sa Pa bùng nổ nào chú?',
    rounds: [
      {
        customerStatement: '"Chenglong M3 xài máy 180 mã sương nhẹ, Auman C160M quất máy 220 mã 6 máy dội lực. Chỉ để kéo 9 tấn đá quặng Sa Pa có lãng phí tiền cước dầu không cụ?"',
        options: [
          {
            key: 'A',
            text: 'Anh Hùng sành sỏi dốc đèo hiểu ngay: Kéo quặng dốc Sa Pa dẫm đá tảng dầm ổ gà sâu cần Sức Mô-Men Xoắn Xả Lực tức thời chứ không chỉ mã lực giấy tờ! Cummins/Yuchai 6 máy 6.8L cho momen cực đại tới 860 Nm xoắn giật ở dải tua cực kì thấp. Xe đi số 3-4 lên dốc leo cao tốc nhàn tênh nhẹ nhàng ga chớm trớn rơ bốc, mượt cước dải dầu dã quỳ. Còn Chenglong M3 máy 180 mã lực yếu 4 máy gân guốc oằn gầm, bò ì ạch dốc rít bóp sườn dạt khói đen, lái xe giật rà côn cháy tơi dĩa ép, vừa hao dầu rỉ nhớt vừa nát côn kéo đà rọ sườn. Tính ra 220 mã máy 6 dã chiến lại ăn dạt dầu ít hơn hẳn gồng gào gượng của 180 mã nhé anh Hùng!',
            points: 30,
            closureDelta: 25,
            feedback: '"Phân tích cốt cõng mô-men cực đại 860Nm 6 xilanh 6.8L bốc trớn lướt đèo Sa Pa rất sâu sắc kỹ thuật! Gánh mỏ đá mà xài máy 180HP oằn giật sườn dộc đúng là cực hình tra tấn côn xe."',
            strategyLabel: 'TVBH Uy Tín - Phân tích đặc thù tải mỏ đá quặng momen lớn',
            expertExplanation: 'Cước đá quặng bửng mỏ dốc cao cực kỳ kỵ máy yếu gượng côn hao lực dầm. Khẳng định sức dũng mãnh 860Nm của cỗ máy Yuchai 6 xi-lanh là bảo chứng gánh tải dã nát đầm lầy đối thủ 180HP.'
          },
          {
            key: 'B',
            text: 'Dạ máy to 220 sức kéo bốc dải dài hao dầu bặm bọ lắm anh Hùng ơi, nhưng gá đè cước kéo bạt tải mười lăm mười bảy tấn xi măng lậu vượt cân dồi dào bến cảng loáng một buổi là cân đủ chi phí bù dầu rỉ sườn, anh gá bừa chạy né cân ban đêm là lời gặt hái lớn.',
            points: 5,
            closureDelta: 10,
            feedback: '"Uầy cậu sales xui chạy tống tải lợn mười bảy tấn đai mỏ dốc đèo đêm Sa Pa lỡ lăn vực gãy cầu sập ổ trôi cước cả lò đi móng tay sao chú?"',
            strategyLabel: 'Sales Xúi Dục Vi Phạm An Toàn - Coi thường sinh mệnh bến mỏ',
            expertExplanation: 'Nghiêm cấm lấp liếm bằng xúi giục vượt quá tải trọng khổng lồ bạt tử đèo đêm Sa Pa ngập sương mù tuyết dính trơn trượt.'
          },
          {
            key: 'C',
            text: 'Dạ anh Hùng ơi dòng 220HP bên em gá bộ vỏ nhôm nên xác xe nhẹ hơ hớ, lướt đà trôi dải dọc đèo dạt sườn bốc bấn ngang xe mỏ nhẹ nhẹ, anh đi không chở gì thì dầu bốc ngang con xe bán tải thui anh.',
            points: 15,
            closureDelta: 10,
            feedback: '"Xe 9 tấn xác khủng gầm mỏ sắt dày dập 2 lớp lồng nhau lốp to đùng bệ vệ 6 máy cơ mà cậu bảo ăn dầu ngang bán tải nghe mộc mạc bốc phét quá chú ơi."',
            strategyLabel: 'Sales Phóng Đại Phản Khoa Học - Đưa tin hoang đường đánh bầm uy tín',
            expertExplanation: 'Tuyệt đối không so sánh xe tải nặng 9T ăn dầu ngang bán tải 2.0L. Khách mỏ xe chạy hàng chục vạn cây số hiểu thâm sâu chỉ số tiêu hao thật.'
          }
        ]
      },
      {
        customerStatement: '"Sườn Chassis đá quặng Sa Pa dầm nén nặng nề, dầm nhíp chống vặn sườn của Foton Auman C160M gánh tải thế nào trước dàn ổ gà sụt mỏ biên giới?"',
        options: [
          {
            key: 'A',
            text: 'Anh Hùng hãy sờ tận tay dầm Chassis Auman C160M: Hệ sắt xi kẹp kép kẹp lồng hai lớp thép mác 700L cường độ cực kì cao dập nguội dầy 8+5 mm nguyên bệ dài không nứt dầm vách dạt! Hệ nhíp sau bố trí nhíp lá gánh chịu tải trọng dập bản dầy cường lực đét lướt êm sườn dốc. Khi xe cõng quặng sụ sầm bẫy lốp ngập ổ gà nghiêng 30 độ dốc cua, dầm kép lồng tĩnh điện triệt tiêu hoàn toàn lực vặn xoắn oằn sườn gầm, hệ nhíp nhả lực dạt dào chống gỡ nhíp gãy cốt. Xe đối thủ chassi đơn dập mác rẻ đè quặng nặng một chuyến gặp cua gấp là răng rắc rạn sườn rách đét cabin ngay.',
            points: 30,
            closureDelta: 30,
            feedback: '"Sắt xi lồng kép kẹp 2 thớ 8+5mm cường thép 700L dập dầy chịu uốn thế này đúng là bảo thạch cày ổ gà bến mỏ rồi chú em!"',
            strategyLabel: 'TVBH Chuyên Sâu Cơ Học - Phân tích sắt xi lồng kép chịu vặn xoắn',
            expertExplanation: 'Khách hàng dầm đá và quặng nặng sống chết ở độ dày sắt xi vật lý. Auman C160M chassis 8+5mm lồng kẹp tĩnh điện và hệ nhíp đôi siêu dầy là vũ khí tột đỉnh chinh phục nhà thầu dốc quặng.'
          },
          {
            key: 'B',
            text: 'Dạ chassi bên em thì cũng sắt mộc mạc thép dập phổ biến thui anh ơi, anh đi thấy vặn sườn oằn uội thì gác thêm ba bốn thanh gỗ lát chèn gá kẹp vách sườn sườn thùng dã dượi tăng lực chống nứt sập gãy sườn nha anh.',
            points: 5,
            closureDelta: 5,
            feedback: '"Chèn thanh gỗ thủ công sọt sạt kẹp sườn dầm sắt dầy thép chịu tải mười mấy tấn à cậu sales dạo bấn uột này?"',
            strategyLabel: 'Sales Nghiệp Dư Mơ Hồ - Đưa sáng kiến thô thiển phản cảm',
            expertExplanation: 'Đề xuất gỗ chèn gá chassi bộc lộ sự thiếu kiến thức cơ học công trình dập nén nặng đại sạt nghiệp uy tín hãng.'
          },
          {
            key: 'C',
            text: 'Mác thép dòng này dập nóng siêu dẻo dai anh ạ, uốn vặn xong gãy thì đem vao búa nện rèn mỏ gò loáng cái thẳng tắp sườn đuôi xe bốc dã quỳ dộp cọc luôn nha anh.',
            points: 10,
            closureDelta: 10,
            feedback: '"Vỡ gãy sườn chassis 9 tấn tải thép chịu rung mà bảo đem búa rìu gò hàn tọc vá thủ công sao gánh được an toàn đèo núi hỡi chú em?"',
            strategyLabel: 'Sales Phỏng Đoán - Phát ngôn sai lệch cấu trúc thép xử lý nhiệt',
            expertExplanation: 'Chassis dập nguội kẹp tĩnh điện tuyệt đối không gò dập nhiệt lò rèn thủ công dột sạt mác cấu trúc tôi thép tôi. Sales chuyên sâu bám vững kỹ thuật Thaco.'
          }
        ]
      }
    ]
  }
];

// Helper to safely get the first character of the last name
const getCustomerInitial = (name?: string) => {
  if (!name) return 'K';
  const parts = name.trim().split(/\s+/);
  const lastPart = parts[parts.length - 1];
  return lastPart ? lastPart.charAt(0).toUpperCase() : 'K';
};

export default function RoleplaySimulator() {
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);
  const [currentRoundIdx, setCurrentRoundIdx] = useState<number>(0);
  const [trustScore, setTrustScore] = useState<number>(50); // initial trust
  const [closureScore, setClosureScore] = useState<number>(30); // initial closure likelihood
  const [selectedOptionKey, setSelectedOptionKey] = useState<'A' | 'B' | 'C' | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [userHistory, setUserHistory] = useState<{ round: number; choice: 'A' | 'B' | 'C'; scoreEarned: number }[]>([]);
  const [isAssessmentView, setIsAssessmentView] = useState<boolean>(false);

  const activeScenario = customerScenarios.find(s => s.id === activeScenarioId);
  const currentRound = activeScenario?.rounds[currentRoundIdx];

  // Defensive rendering guard: if active scenario is set but not found, or current round is invalid in dialogue mode
  if (activeScenarioId && !activeScenario) {
    return null;
  }
  if (activeScenarioId && !isAssessmentView && !currentRound) {
    return null;
  }

  const handleStartScenario = (id: string) => {
    setActiveScenarioId(id);
    setCurrentRoundIdx(0);
    setTrustScore(50);
    setClosureScore(30);
    setSelectedOptionKey(null);
    setShowFeedback(false);
    setUserHistory([]);
    setIsAssessmentView(false);
  };

  const handleSelectOption = (key: 'A' | 'B' | 'C') => {
    if (showFeedback) return;
    setSelectedOptionKey(key);
  };

  const handleConfirmChoice = () => {
    if (!selectedOptionKey || !currentRound || !activeScenario) return;

    const chosenOption = currentRound.options.find(o => o.key === selectedOptionKey);
    if (!chosenOption) return;

    // Apply scores with limits 0-100
    setTrustScore(prev => Math.min(100, Math.max(0, prev + chosenOption.points)));
    setClosureScore(prev => Math.min(100, Math.max(0, prev + chosenOption.closureDelta)));

    setUserHistory(prev => [
      ...prev,
      {
        round: currentRoundIdx + 1,
        choice: selectedOptionKey,
        scoreEarned: chosenOption.points
      }
    ]);

    setShowFeedback(true);
  };

  const handleNextRound = () => {
    if (!activeScenario) return;
    
    if (currentRoundIdx < activeScenario.rounds.length - 1) {
      setCurrentRoundIdx(prev => prev + 1);
      setSelectedOptionKey(null);
      setShowFeedback(false);
    } else {
      setIsAssessmentView(true);
    }
  };

  const getAssessmentResult = () => {
    const totalPoints = userHistory.reduce((sum, item) => sum + item.scoreEarned, 0);
    const avgTrust = trustScore;
    const avgClosure = closureScore;

    if (avgTrust >= 85 && avgClosure >= 80) {
      return {
        rank: 'Chuyên Gia Tư Vấn Vàng (Master Fleet Advisor)',
        desc: 'Hiểu cặn kẽ tâm lý khách hàng doanh nghiệp, kết nối tối đa cơ hội bán hàng bằng phương pháp tư duy FAB và quy trình 9-MOTS bán xe tải chuẩn. Thông thạo đặc tính kỹ thuật Cummins / ZF / Chassis dập nguội gánh tải Foton dã chiến đỉnh cao!',
        color: 'text-amber-600 bg-amber-50 border-amber-200',
        badgeColor: 'bg-amber-100 text-amber-800'
      };
    } else if (avgTrust >= 65 && avgClosure >= 60) {
      return {
        rank: 'Tư Vấn Bán Hàng Chuyên Nghiệp (Professional Sales)',
        desc: 'Kỹ năng giao lưu tốt, biết so sánh kỹ thuật sản phẩm nhưng thỉnh thoảng còn bị đối thủ hoặc lo lắng giá cả của khách dẫn dắt dột sườn. Cần gia cố thêm luận điểm gầm chassis dập nguội và lợi điểm kinh tế tiêu hao nhiên liệu Foton S70/S70L cốt lõi.',
        color: 'text-blue-600 bg-blue-50 border-blue-200',
        badgeColor: 'bg-blue-100 text-blue-800'
      };
    } else {
      return {
        rank: 'Sales Đấu Giá Chiết Khấu (Discount Clasher)',
        desc: 'Mắc bẫy ép giá vặt bớt hoa hồng hoặc tư vấn chưa sát sườn thông số kỹ thuật (đóng pallet, tải đăng kiểm). Dễ làm bốc hơi độ uy tín chuyên gia của sản phẩm gầm cao Foton Aumark. Vui lòng bấm Luyện tập lại để ôn luyện chuỗi truyền động ZF Đức và tải đăng kiểm pháp lý cứu vãn cước mận!',
        color: 'text-rose-600 bg-rose-50 border-rose-200',
        badgeColor: 'bg-rose-100 text-rose-800'
      };
    }
  };

  return (
    <div className="space-y-6" id="roleplay-simulator-portal">
      {/* HEADER PORTAL BANNER */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 relative overflow-hidden border border-slate-800 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold tracking-wider uppercase bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Mô Phỏng Tư Vấn Đỉnh Cao
            </span>
            <h2 className="text-xl md:text-2xl font-black font-sans tracking-tight">
              Phòng Luyện Thực Chiến • Sales Kịch Tính Live
            </h2>
            <p className="text-xs text-slate-350 leading-relaxed">
              Nhập vai thành Chuyên viên bán hàng cao cấp Foton sành sỏi. Đối thoại trực tiếp với các ông chủ nhà xe Logistics biển Hải Hải Phòng, chủ vựa nông sản dốc lớn Mộc Châu bướng bỉnh để gỡ rối băn khoăn giá cả xe dòng máy Cummins <b className="text-slate-200">Aumark S70, S70L, Wonder, X25</b> dọn bến lái cọc rực rỡ!
            </p>
          </div>
          {activeScenarioId && (
            <button
              onClick={() => setActiveScenarioId(null)}
              className="py-2.5 px-4 bg-white/10 hover:bg-white/15 text-white font-bold rounded-2xl text-xs transition-all flex items-center gap-2 cursor-pointer border border-white/5 select-none"
            >
              <Users className="w-3.5 h-3.5" />
              Đổi Persona Khách
            </button>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* SELECT SCENARIO DASHBOARD */}
        {!activeScenarioId ? (
          <motion.div
            key="selection-board"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {customerScenarios.map((scen) => (
                <div 
                  key={scen.id}
                  className="bg-white border border-slate-200 hover:border-blue-300 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between gap-5 group shadow-sm hover:shadow-md"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold font-sans text-sm border ${scen.avatarBg}`}>
                        {getCustomerInitial(scen.customerName)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-800 font-sans">{scen.customerName}</h4>
                          <span className="text-[9px] font-bold font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/60">
                            {scen.location.split(',')[1]?.trim() || scen.location}
                          </span>
                        </div>
                        <p className="text-[11px] font-mono text-slate-400 font-medium">{scen.role}</p>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                        <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 block mb-1">Mảng Hàng &amp; Phân Vùng Chạy:</span>
                        <p className="text-slate-700 font-medium font-sans leading-relaxed flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          {scen.cargo}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-slate-650">
                        <div className="p-2.5 bg-blue-50/40 border border-blue-100/50 rounded-xl">
                          <b className="text-[9px] font-bold text-blue-800 uppercase tracking-wide block mb-0.5">Sản phẩm đích nhắm:</b>
                          <span className="text-[11px] font-sans font-bold text-blue-950 flex items-center gap-1">
                            <Truck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                            {scen.targetProduct}
                          </span>
                        </div>
                        <div className="p-2.5 bg-orange-50/40 border border-orange-100/50 rounded-xl">
                          <b className="text-[9px] font-bold text-orange-850 uppercase tracking-wide block mb-0.5">Đối thủ bám ráo:</b>
                          <span className="text-[11px] font-sans font-bold text-orange-950 flex items-center gap-0.5">
                            <Flame className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                            {scen.competitors.split('(')[0]?.trim() || scen.competitors}
                          </span>
                        </div>
                      </div>

                      <div className="p-3 bg-rose-550/5 border border-rose-100 rounded-2xl">
                        <span className="text-[9px] uppercase tracking-wider font-bold text-rose-600 block mb-0.5">Gai Góc objections:</span>
                        <p className="text-slate-600 font-medium font-sans italic leading-relaxed text-[11px]">
                          "{scen.painPoints}"
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartScenario(scen.id)}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl text-xs uppercase tracking-wider cursor-pointer transition-all flex items-center justify-center gap-2 group-hover:scale-[1.01] active:scale-95 shadow-md shadow-blue-500/10"
                  >
                    Bắt đầu thương lượng thực chiến
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* TIP BLOCK DEFEAT OBJECTIONS */}
            <div className="bg-orange-50 border border-orange-100 rounded-3xl p-5 md:p-6 flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="p-3 bg-orange-100 text-orange-800 rounded-2xl shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-orange-950 uppercase tracking-wide">Mẹo Nhập Vai Thượng Thừa (9-MOTS FAB):</h4>
                <p className="text-xs text-slate-750 leading-relaxed font-sans font-medium">
                  Đừng mải lo giảm giá hời hợt hoặc nói xấu đối thủ gay rợt. Hãy cho khách thấy <b>Chất lượng Động cơ đồng bộ ZF Đức cao cấp</b> xe Foton gánh cước mận siêu nhẹ tiết kiệm nhiên liệu dải dài, dầm gá <b>chassis dập nguội nguyên tấm 700L</b> không rộp rỉ dính cua đèo.
                </p>
              </div>
            </div>
          </motion.div>
        ) : isAssessmentView ? (
          /* SALES ASSESSMENT REPORT CARD */
          <motion.div
            key="assessment-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-6 md:p-8 bg-white border border-slate-200 rounded-3xl space-y-6 max-w-2xl mx-auto shadow-sm"
          >
            <div className="text-center space-y-3">
              <div className="inline-flex p-4 bg-emerald-50 rounded-full border border-emerald-100 text-emerald-600 animate-bounce">
                <Award className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-800 font-sans uppercase">Đã Hủy Diệt Rào Cản Thuyết Phục!</h3>
                <p className="text-xs text-slate-500">Báo cáo đánh giá năng lực thực chiến bán dòng Foton {activeScenario?.targetProduct}</p>
              </div>
            </div>

            {/* PSYCHOLOGY STATS RESULT ROW */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-center space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Độ Tin Cậy Tư Vấn (Trust)</span>
                <span className="text-2xl font-black font-mono text-emerald-600">{trustScore}%</span>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-2">
                  <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: `${trustScore}%` }} />
                </div>
              </div>
              
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-center space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Cơ Hội Chốt Đặt Cọc (Deal)</span>
                <span className="text-2xl font-black font-mono text-blue-600">{closureScore}%</span>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-2">
                  <div className="bg-blue-500 h-full rounded-full transition-all duration-1000" style={{ width: `${closureScore}%` }} />
                </div>
              </div>
            </div>

            {/* STRATEGY ASSESSMENT CARD */}
            <div className={`p-5 border rounded-2xl space-y-2 ${getAssessmentResult().color}`}>
              <div className="flex items-center gap-2">
                <span className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${getAssessmentResult().badgeColor}`}>
                  Hạng Thao Tác
                </span>
                <h4 className="text-sm font-black font-sans">{getAssessmentResult().rank}</h4>
              </div>
              <p className="text-xs leading-relaxed font-sans font-medium text-slate-700">
                {getAssessmentResult().desc}
              </p>
            </div>

            {/* ROUND-BY-ROUND BREAKDOWN */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase block tracking-wider">Lịch sử điều lệnh thương thuyết:</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin pr-1">
                {userHistory.map((h, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-150 rounded-xl text-xs">
                    <span className="font-mono text-slate-400 font-bold">Round {h.round}:</span>
                    <span className="font-sans font-medium text-slate-700">Lựa chọn Phương án {h.choice}</span>
                    <span className={`font-mono font-bold ${h.scoreEarned >= 25 ? 'text-emerald-600' : h.scoreEarned >= 15 ? 'text-blue-500' : 'text-rose-500'}`}>
                      {h.scoreEarned >= 0 ? `+${h.scoreEarned}` : h.scoreEarned} Điểm Úy Tín
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => activeScenario && handleStartScenario(activeScenario.id)}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl text-xs uppercase tracking-wider cursor-pointer transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-500/10"
            >
              <RefreshCw className="w-4 h-4" />
              Luyện Tập Lại Toàn Chặng
            </button>
          </motion.div>
        ) : (
          /* LIVE DIALOGUE INTERACTIVE PANEL */
          <motion.div
            key="live-talk-panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* LATERBAR STATS CARDS */}
            <div className="space-y-6 lg:col-span-1">
              {/* TARGET PROFILE COMPACT */}
              <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4 shadow-sm">
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">Khách đang đối thoại:</span>
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs bg-slate-105 border border-slate-200 text-slate-800">
                      {getCustomerInitial(activeScenario?.customerName)}
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 font-sans">{activeScenario?.customerName}</h4>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">{activeScenario?.location}</p>
                </div>

                <div className="space-y-2 text-[11px] border-t border-slate-100 pt-3 text-slate-600">
                  <div>
                    <h5 className="font-bold text-slate-400 text-[10px] uppercase block">Dòng xe nhắm gá cước:</h5>
                    <p className="font-sans font-bold text-blue-900 leading-relaxed mt-0.5">
                      {activeScenario?.targetProduct}
                    </p>
                    <p className="text-[10px] text-slate-400 italic">
                      ({activeScenario?.targetProductSpecs ? (activeScenario.targetProductSpecs.split(',')[0] || '') : ''} 
                      {activeScenario?.targetProductSpecs?.split(',')[1] ? ` - ${activeScenario.targetProductSpecs.split(',')[1]}` : ''})
                    </p>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-400 text-[10px] uppercase block">Hàng cõng tải chuyên biệt:</h5>
                    <p className="font-sans font-medium text-slate-700 leading-relaxed mt-0.5">
                      {activeScenario?.cargo}
                    </p>
                  </div>
                </div>
              </div>

              {/* INTERACTIVE METERS */}
              <div className="bg-slate-900 text-white border border-slate-800 rounded-3xl p-5 space-y-4 shadow-md">
                <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Chỉ Số Thỏa Hiệp Khách Hàng</h4>
                
                <div className="space-y-3">
                  {/* Trust Slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-bold font-sans">
                      <span className="text-slate-350">Mức Độ Tin Cậy (Trust)</span>
                      <span className="text-emerald-400">{trustScore}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${trustScore}%` }} />
                    </div>
                  </div>

                  {/* Closure Slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-bold font-sans">
                      <span className="text-slate-350 font-sans">Khả Năng Hạ Cọc Xe (Deal)</span>
                      <span className="text-blue-400">{closureScore}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: `${closureScore}%` }} />
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] text-slate-350 italic font-sans font-medium leading-relaxed">
                  Lưu ý: Nếu Độ tin cậy giảm sâu dưới <span className="text-rose-400">35%</span>, khách có thể nản chí bỏ về hoặc quay sang mua xe cỏ Hyundai bãi hay Ollin sườn mỏng. Thận trọng trong dọn ý!
                </div>
              </div>
            </div>

            {/* MAIN PLAY DIALOG PANEL */}
            <div className="lg:col-span-2 space-y-4">
              {/* CURRENT CHAT DIALOG BUBBLES */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 min-h-[340px] flex flex-col justify-between gap-6 shadow-sm">
                
                {/* Dialogue Area */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-[9px] font-mono text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                      Hiệp thương: {currentRoundIdx + 1} / {activeScenario?.rounds?.length || 1}
                    </span>
                    <span className="text-[10px] font-sans text-slate-400 font-medium">Đối mặt live</span>
                  </div>

                  {/* Customer Question Bubble */}
                  <div className="flex gap-3 items-start max-w-[85%]">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs bg-slate-100 border border-slate-250 text-slate-800 shrink-0">
                      {getCustomerInitial(activeScenario?.customerName)}
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl rounded-tl-sm text-xs text-slate-800 leading-relaxed font-sans font-medium">
                      <p className="font-bold text-[10px] text-slate-400 uppercase tracking-wide block mb-1">
                        {activeScenario?.customerName} bức bối phản đối:
                      </p>
                      {currentRound?.customerStatement}
                    </div>
                  </div>

                  {/* Animated Customer Feedback Bubble (if showFeedback is true) */}
                  {showFeedback && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3 items-start max-w-[85%] ml-auto flex-row-reverse"
                    >
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs bg-slate-900 border border-slate-800 text-white shrink-0">
                        {getCustomerInitial(activeScenario?.customerName)}
                      </div>
                      <div className="p-4 bg-slate-900 text-white rounded-2xl rounded-tr-sm text-xs leading-relaxed font-sans font-medium">
                        <p className="font-bold text-[10px] text-emerald-400 uppercase tracking-wide block mb-1">
                          Phản ứng thực tế của {activeScenario?.customerName}:
                        </p>
                        "{currentRound?.options?.find(o => o.key === selectedOptionKey)?.feedback}"
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Confirm & Progression Button */}
                {!showFeedback ? (
                  <div className="flex justify-end">
                    <button
                      disabled={!selectedOptionKey}
                      onClick={handleConfirmChoice}
                      className="py-2.5 px-6 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-250 text-white font-bold rounded-xl text-xs uppercase cursor-pointer disabled:cursor-not-allowed select-none transition-all"
                    >
                      Khẳng Định Tư Vấn
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-end animate-fade-in">
                    <button
                      onClick={handleNextRound}
                      className="py-2.5 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs uppercase cursor-pointer transition-all flex items-center gap-1"
                    >
                      {currentRoundIdx < (activeScenario?.rounds?.length || 0) - 1 ? 'Chuyển Sang Hiệp Tiếp Cách' : 'Xem Đánh Giá Báo Cáo'}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* OPTIONS SELECT BLOCK */}
              <AnimatePresence mode="wait">
                {!showFeedback ? (
                  <motion.div 
                    key="options-block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3"
                  >
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Chọn phương án tư vấn hợp lý:</h4>
                    
                    <div className="space-y-2">
                      {currentRound?.options?.map((opt) => (
                        <button
                          key={opt.key}
                          onClick={() => handleSelectOption(opt.key)}
                          className={`w-full text-left p-4 rounded-2xl border text-xs leading-relaxed font-sans font-medium transition-all cursor-pointer ${
                            selectedOptionKey === opt.key 
                              ? 'bg-blue-50/70 border-blue-500 text-blue-950 shadow-sm shadow-blue-500/5' 
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-350 hover:bg-slate-50/50'
                          }`}
                        >
                          <div className="flex gap-2.5 items-start">
                            <span className={`w-5 h-5 rounded-md flex items-center justify-center font-bold font-mono text-[10px] shrink-0 mt-0.5 ${
                              selectedOptionKey === opt.key 
                                ? 'bg-blue-600 text-white' 
                               : 'bg-slate-100 text-slate-500 border border-slate-200'
                            }`}>
                              {opt.key}
                            </span>
                            <span className="flex-1">{opt.text}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  /* EXPERT INTERACTIVE EXPLANATION CARD (ONLY SHOWN AFTER USER MAKES A CHOICE) */
                  <motion.div
                    key="expert-explanation-block"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-5 bg-orange-50 border border-orange-100 rounded-3xl space-y-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center p-1.5 bg-orange-100 border border-orange-200 text-orange-800 rounded-lg">
                        <MessageSquare className="w-4 h-4" />
                      </span>
                      <div>
                        <span className="text-[9px] uppercase font-bold text-orange-800 block">Ý Nghĩa Phương Pháp Sát Hạch:</span>
                        <h5 className="text-[11px] font-bold text-slate-800">
                          Luận giải của Chuyên gia 9-MOTS FAB
                        </h5>
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
                      {currentRound?.options?.find(o => o.key === selectedOptionKey)?.expertExplanation}
                    </p>

                    <div className="text-[10px] font-mono text-indigo-905 bg-indigo-50/10 border border-indigo-150/40 p-2.5 rounded-xl block italic">
                      <b>Đánh giá Sườn:</b> {currentRound?.options?.find(o => o.key === selectedOptionKey)?.strategyLabel}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
