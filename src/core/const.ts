
import { Like, Not, Between, Equal, LessThanOrEqual, In, MoreThanOrEqual, MoreThan, LessThan, And } from "typeorm"
import moment from "moment-timezone";
export interface ApiQueryRestParams {
    _page?: number;
    _limit?: number;
    _sort?: string;
    _order?: 'ASC' | 'DESC';
    q?: string;
    name?: string;
    _noQuery?: number;
    [key: string]: any; // Allow additional properties
}
export interface IQuery {
    skip?: number;
    take?: number;
    sort?: string;
    order?: { [key: string]: string }
    q?: string;
    name?: string;
    [key: string]: any;
};


const handleToan = ({ op, opValue }) => {
    if (op === 'between') {
        return Between(opValue.shift(), opValue.pop());
    } else if (op === "max") {
        return MoreThanOrEqual(opValue.join('_'));
    } else if (op === "gt") {
        return MoreThan(opValue.join('_'));
    } else if (op === "min") {
        return LessThanOrEqual(opValue.join('_'));
    } else if (op === "lt") {
        return LessThan(opValue.join('_'));
    } else if (op === "in") {
        return In(opValue.map((item: any) => item));
    } else if (op === "not") {
        return Not(opValue.map((item: any) => item));
    } else {
        return op;
    }
};
export const apiQueryRest = (params: ApiQueryRestParams): IQuery => {
    const { _page, _limit, _sort, _order, search, name, _noQuery, ...rest } = params;
    let query: IQuery = {};
    if (_noQuery === 1) return null;
    if (_limit) query.take = +_limit;
    if (_page) query.skip = (+_page - 1) * (_limit || 10);
    if (search) query.where = { [name || "name"]: Like(`%${search}%`) };
    if (_sort) query.order = { [_sort]: _order || "DESC" };

    if (Object.keys(rest).length > 0) {
        let whereConditions = {};
        for (const [index, value] of Object.entries(rest)) {
            const key = index.substring(1);
            if (typeof value === 'string') {
                const [op, ...opValue] = value.split("_");
                whereConditions[key] = handleToan({ op, opValue })
            } else {
                const ope = value.map((item: any) => {
                    const [op, ...opValue] = item.split("_");
                    return handleToan({ op, opValue })
                })
                whereConditions[key] = And(...ope)
            }
        }
        query.where = { ...query.where, ...whereConditions };
    }
    return query;
};


export const handleWeek = (i: number) => {
    const startOfWeek = moment().week(i).startOf('week');
    const endOfWeek = moment().week(i).endOf('week');
    return { startOfWeek, endOfWeek }
}


export function getCurrentWeek() {
    console.log(moment().week())
    // var currentDate = moment();

    // var weekStart = currentDate.clone().startOf('isoWeek');
    // var weekEnd = currentDate.clone().endOf('isoWeek');

    // var days = [];

    // for (var i = 0; i <= 6; i++) {
    //     days.push(moment(weekStart).add(i, 'days').format("MMMM Do,dddd"));
    // }
    // console.log(days);
}

getCurrentWeek();

getCurrentWeek();
export const data = [
    {
        "id": 254,
        "name": "Từ Kiến Trúc Sư Thành Bác Sĩ Tại Hoa Kỳ - Dám Chọn Lựa, Dám Thành Công",
        "description": "Từ Kiến Trúc Sư Thành Bác Sĩ Tại Hoa Kỳ - Dám Chọn Lựa, Dám Thành Công\r\n\r\nTừ Kiến trúc sư thành Bác sĩ tại Hoa Kỳ là quyển sách kể về hành trình cậu sinh viên chuyên Toán trường THPT Chuyên Bạc Liêu theo học Kiến trúc tại Việt Nam và tại Mỹ, đến khi quyết định từ bỏ Kiến trúc để theo đuổi con đường Y khoa – ngành học được xem là khó nhất và tốt nhất tại Mỹ. Và sau chục năm học hành miệt mài, đến nay đã trở thành một Bác sĩ ít nhiều có tiếng tăm trong cộng đồng.\r\n\r\nNhững chia sẻ từ góc nhìn của người trong cuộc sẽ giúp bạn đọc phần nào hiểu được quá trình thực tế cũng như những khó khăn, nỗi niềm vui buồn trong nghề. Qua đó, hy vọng sẽ tiếp thêm động lực trên hành trình theo đuổi nghề nghiệp cho bạn. Dám lựa chọn, hết mình vì lựa chọn của bản thân, thành công sẽ đến.\r\n\r\n+TRÍCH ĐOẠN:\r\n\r\n“Sẽ có những lúc bạn phải đối mặt với những lựa chọn khó khăn về nghề nghiệp trong cuộc đời, nhất là trước ngã rẽ chuyển đổi qua một nghề mới hoàn toàn xa lạ. Tôi mong cuốn sách này sẽ tiếp thêm cho bạn sức mạnh để quyết định. Hãy đi theo đam mê của mình. Vì nếu bạn dám chọn lựa, bạn sẽ dám thành công.”\r\n\r\n“Chỉ một thời gian ngắn, tôi nắm bệnh sử của bệnh nhân tốt hơn và không còn cảm giác lo sợ điều dưỡng nữa. Thậm chí, tôi còn giải thích cho điều dưỡng hiểu về một số bệnh lý cơ bản. Cuối mỗi tháng thực tập, tôi đều mua bánh Donut và cà phê tặng mọi người, chúng tôi chúc nhau cùng làm tốt công việc. Sau này, tôi nhận được thư khen ngợi của các điều dưỡng. Có người còn đưa tên tôi vào danh sách ứng viên hoa hướng dương của bệnh viện (dành cho những bác sĩ đối xử tốt với bệnh nhân và điều dưỡng).\r\n\r\nNhờ cách ứng xử này, tôi được các điều dưỡng, sinh viên, bác sĩ nội trú, và giảng viên bình chọn giải thưởng “bác sĩ nội trú giảng dạy tốt nhất” trong lúc làm bác sĩ nội trú chuyên khoa nội tổng quát. Tôi kể câu chuyện năm xưa cho em sinh viên nghe.\r\n\r\nNghe xong, em im lặng một lúc, rồi nhìn vào mắt tôi:\r\n\r\n– Cảm ơn thầy. Em sẽ làm giống như vậy.\r\n\r\nTôi bước ra khỏi phòng, thấy vui vui trong lòng khi vừa mở thêm một cánh cửa cho một bác sĩ tương lai.\r\n\r\nCứ mỗi bạn sinh viên Y vào được nội trú, mỗi bài học có ích tôi dạy sinh viên, hay mỗi bài báo nhóm của tôi được đăng là tôi có thêm một niềm vui nho nhỏ.\r\n\r\nVà cứ thế, tôi trở thành ông đồ, mỗi ngày đưa đò cho các em qua sông, thẳng tiến trên con đường Y khoa nhiều sóng gió bập bềnh khúc khuỷu. Tôi mong sau này, các em sẽ còn bay cao và bay xa hơn tôi.”\r\n\r\nMã hàng\t9786047798070\r\nNhà Cung Cấp\tCÔNG TY TNHH VIETMD.NET\r\nTác giả\tBS Huỳnh Wynh Trần\r\nNXB\tNXB Thế Giới\r\nNăm XB\t2021\r\nTrọng lượng (gr)\t300\r\nKích Thước Bao Bì\t20.5 x 14 x 0.5 cm\r\nSố trang\t312\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Câu Chuyện Cuộc Đời bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nTừ Kiến Trúc Sư Thành Bác Sĩ Tại Hoa Kỳ - Dám Chọn Lựa, Dám Thành Công\r\n\r\nTừ Kiến trúc sư thành Bác sĩ tại Hoa Kỳ là quyển sách kể về hành trình cậu sinh viên chuyên Toán trường THPT Chuyên Bạc Liêu theo học Kiến trúc tại Việt Nam và tại Mỹ, đến khi quyết định từ bỏ Kiến trúc để theo đuổi con đường Y khoa – ngành học được xem là khó nhất và tốt nhất tại Mỹ. Và sau chục năm học hành miệt mài, đến nay đã trở thành một Bác sĩ ít nhiều có tiếng tăm trong cộng đồng.\r\n\r\nNhững chia sẻ từ góc nhìn của người trong cuộc sẽ giúp bạn đọc phần nào hiểu được quá trình thực tế cũng như những khó khăn, nỗi niềm vui buồn trong nghề. Qua đó, hy vọng sẽ tiếp thêm động lực trên hành trình theo đuổi nghề nghiệp cho bạn. Dám lựa chọn, hết mình vì lựa chọn của bản thân, thành công sẽ đến.\r\n\r\n+TRÍCH ĐOẠN:\r\n\r\n“Sẽ có những lúc bạn phải đối mặt với những lựa chọn khó khăn về nghề nghiệp trong cuộc đời, nhất là trước ngã rẽ chuyển đổi qua một nghề mới hoàn toàn xa lạ. Tôi mong cuốn sách này sẽ tiếp thêm cho bạn sức mạnh để quyết định. Hãy đi theo đam mê của mình. Vì nếu bạn dám chọn lựa, bạn sẽ dám thành công.”\r\n\r\n“Chỉ một thời gian ngắn, tôi nắm bệnh sử của bệnh nhân tốt hơn và không còn cảm giác lo sợ điều dưỡng nữa. Thậm chí, tôi còn giải thích cho điều dưỡng hiểu về một số bệnh lý cơ bản. Cuối mỗi tháng thực tập, tôi đều mua bánh Donut và cà phê tặng mọi người, chúng tôi chúc nhau cùng làm tốt công việc. Sau này, tôi nhận được thư khen ngợi của các điều dưỡng. Có người còn đưa tên tôi vào danh sách ứng viên hoa hướng dương của bệnh viện (dành cho những bác sĩ đối xử tốt với bệnh nhân và điều dưỡng).\r\n\r\nNhờ cách ứng xử này, tôi được các điều dưỡng, sinh viên, bác sĩ nội trú, và giảng viên bình chọn giải thưởng “bác sĩ nội trú giảng dạy tốt nhất” trong lúc làm bác sĩ nội trú chuyên khoa nội tổng quát. Tôi kể câu chuyện năm xưa cho em sinh viên nghe.\r\n\r\nNghe xong, em im lặng một lúc, rồi nhìn vào mắt tôi:\r\n\r\n– Cảm ơn thầy. Em sẽ làm giống như vậy.\r\n\r\nTôi bước ra khỏi phòng, thấy vui vui trong lòng khi vừa mở thêm một cánh cửa cho một bác sĩ tương lai.\r\n\r\nCứ mỗi bạn sinh viên Y vào được nội trú, mỗi bài học có ích tôi dạy sinh viên, hay mỗi bài báo nhóm của tôi được đăng là tôi có thêm một niềm vui nho nhỏ.\r\n\r\nVà cứ thế, tôi trở thành ông đồ, mỗi ngày đưa đò cho các em qua sông, thẳng tiến trên con đường Y khoa nhiều sóng gió bập bềnh khúc khuỷu. Tôi mong sau này, các em sẽ còn bay cao và bay xa hơn tôi.”",
        "public": true,
        "publish_date": "2020",
        "author": "BS Huỳnh Wynh Trần",
        "amount": 100,
        "number_of_page": 312,
        "sold": 1,
        "rating": 5,
        "price": 126000,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/i/m/image_244718_1_6160.jpg",
        "slug": "tu-kien-truc-su-thanh-bac-si-tai-hoa-ky-dam-chon-lua-dam-thanh-cong",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 14,
            "name": "TIỂU SỬ HỒI KÝ",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 255,
        "name": "Bí Mật Nhà Bếp - Giới Đầu Bếp Và Những Chuyện Bếp Núc Động Trời",
        "description": "Ngay từ khi xuất bản, Kitchen Confidential đã lọt vào danh sách best-seller của tờ The New York Times và đã được dịch ra hơn 20 ngôn ngữ.\r\n\r\n\"Hấp dẫn hơn cả một cuốn tiểu thuyết của Stephen King\". – Sunday Times\r\n\r\n\"Đây là cuốn sách mà tất cả các đầu bếp chuyên nghiệp đều cần phải đọc. Giờ đây Escoffier và Larousse nên thêm vào cái tên Bourdain\". – The Guardian\r\n\r\n\"Kitchen Confidential là một cách nhìn tuyệt vời về cái thế giới lạ lùng ẩn đằng sau cuốn thực đơn\". – USA Today\r\n\r\n\"Bạn sẽ cười, bạn sẽ khóc… bạn sẽ yêu cuốn sách này\". – Denver Post\r\n\r\n\"Thật kích động… Bourdain đã hân hoan xé toạc bức màn che phủ những cảnh rùng rợn phía sau sân khấu\". – New York Times Book Review\r\n\r\n“Tôi đã dành nửa đời người của mình quan sát mọi người, chỉ bảo cho họ, cố gắng dự đoán suy nghĩ, tâm trạng, động lực và hành động của họ, rồi bỏ chạy khỏi họ, cố gắng điều khiển họ và bị họ điều khiển. Như thế vẫn chưa đủ để tôi hiểu hết. Con người là một bí ẩn đối với tôi. Họ làm tôi phân vân.\r\n\r\nThức ăn thì không. Tôi biết tôi đang ngắm cái gì khi thấy một miếng thịt thăn cá ngừ loại một. Tôi có thể hiểu tại sao hàng triệu người Nhật lại khao khát cái loại cá với chất thịt dai dai, chắc nụi và óng ánh dưới ánh đèn đến như thế. Tôi hiểu vì sao ông chủ của tôi lại rơi nước mắt khi thấy món choucroute garnie được thực hành đúng cách. Màu sắc, mùi vị, kết cấu, trình bày,… và cả lý lịch cá nhân. Ai mà biết quá khứ của ông ấy đã diễn ra những sự kiện gì để bây giờ khi thấy món ăn này, ông lại trào nước mắt? Ai mà thèm quan tâm? Tôi chỉ biết những gì tôi đang thấy. Và tôi hiểu ngay không cần giải thích. Chỉ thế thôi.”\r\n\r\nVề tác giả\r\n\r\nAnthony Bourdain\r\n\r\nSinh năm 1956 tại New York.\r\n\r\nLà một đầu bếp, tác giả, kiêm nhà làm phim tài liệu về những nền văn hóa, ẩm thực.\r\n\r\nÔng tốt nghiệp Học viện Ẩm thực Hoa Kỳ (CIA) năm 1978. Từ một người rửa bát thuê cho một nhà hàng ở bang Massachusetts, ông trở thành bếp trưởng của nhiều nhà hàng nổi tiếng ở New York, trong đó cột mốc đáng nhớ nhất là trở thành bếp trưởng điều hành của nhà hàng Brasserie Les Halles vào năm 1998. Ông được đánh giá là một trong những đầu bếp có ảnh hưởng nhất làng ẩm thực đương đại, truyền cảm hứng cho nhiều người học cách khám phá văn hóa qua ẩm thực.\r\n\r\nNgoài ẩm thực và đam mê viết lách, Anthony Bourdain còn là một nhà làm phim tài liệu xuất sắc. Hai chương trình nổi tiếng của ông là Anthony Bourdain: No Reservations (Travel Channel) và Parts Unknown (CNN).\r\n\r\nTháng 6-2018, ông được phát hiện đã tự tử tại một khách sạn ở Paris khi đang thực hiện chương trình Parts Unknown.\r\n\r\nMã hàng\t8936144200414\r\nTên Nhà Cung Cấp\tPhanbook\r\nTác giả\tAnthony Bourdain\r\nNgười Dịch\tLê Thảo Nguyên\r\nNXB\tNXB Phụ Nữ\r\nNăm XB\t2019\r\nTrọng lượng (gr)\t450\r\nKích Thước Bao Bì\t16 x 24\r\nSố trang\t425\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Câu Chuyện Cuộc Đời bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nNgay từ khi xuất bản, Kitchen Confidential đã lọt vào danh sách best-seller của tờ The New York Times và đã được dịch ra hơn 20 ngôn ngữ.\r\n\r\n\"Hấp dẫn hơn cả một cuốn tiểu thuyết của Stephen King\". – Sunday Times\r\n\r\n\"Đây là cuốn sách mà tất cả các đầu bếp chuyên nghiệp đều cần phải đọc. Giờ đây Escoffier và Larousse nên thêm vào cái tên Bourdain\". – The Guardian\r\n\r\n\"Kitchen Confidential là một cách nhìn tuyệt vời về cái thế giới lạ lùng ẩn đằng sau cuốn thực đơn\". – USA Today\r\n\r\n\"Bạn sẽ cười, bạn sẽ khóc… bạn sẽ yêu cuốn sách này\". – Denver Post\r\n\r\n\"Thật kích động… Bourdain đã hân hoan xé toạc bức màn che phủ những cảnh rùng rợn phía sau sân khấu\". – New York Times Book Review\r\n\r\n“Tôi đã dành nửa đời người của mình quan sát mọi người, chỉ bảo cho họ, cố gắng dự đoán suy nghĩ, tâm trạng, động lực và hành động của họ, rồi bỏ chạy khỏi họ, cố gắng điều khiển họ và bị họ điều khiển. Như thế vẫn chưa đủ để tôi hiểu hết. Con người là một bí ẩn đối với tôi. Họ làm tôi phân vân.\r\n\r\nThức ăn thì không. Tôi biết tôi đang ngắm cái gì khi thấy một miếng thịt thăn cá ngừ loại một. Tôi có thể hiểu tại sao hàng triệu người Nhật lại khao khát cái loại cá với chất thịt dai dai, chắc nụi và óng ánh dưới ánh đèn đến như thế. Tôi hiểu vì sao ông chủ của tôi lại rơi nước mắt khi thấy món choucroute garnie được thực hành đúng cách. Màu sắc, mùi vị, kết cấu, trình bày,… và cả lý lịch cá nhân. Ai mà biết quá khứ của ông ấy đã diễn ra những sự kiện gì để bây giờ khi thấy món ăn này, ông lại trào nước mắt? Ai mà thèm quan tâm? Tôi chỉ biết những gì tôi đang thấy. Và tôi hiểu ngay không cần giải thích. Chỉ thế thôi.”\r\n\r\nVề tác giả\r\n\r\nAnthony Bourdain\r\n\r\nSinh năm 1956 tại New York.\r\n\r\nLà một đầu bếp, tác giả, kiêm nhà làm phim tài liệu về những nền văn hóa, ẩm thực.\r\n\r\nÔng tốt nghiệp Học viện Ẩm thực Hoa Kỳ (CIA) năm 1978. Từ một người rửa bát thuê cho một nhà hàng ở bang Massachusetts, ông trở thành bếp trưởng của nhiều nhà hàng nổi tiếng ở New York, trong đó cột mốc đáng nhớ nhất là trở thành bếp trưởng điều hành của nhà hàng Brasserie Les Halles vào năm 1998. Ông được đánh giá là một trong những đầu bếp có ảnh hưởng nhất làng ẩm thực đương đại, truyền cảm hứng cho nhiều người học cách khám phá văn hóa qua ẩm thực.\r\n\r\nNgoài ẩm thực và đam mê viết lách, Anthony Bourdain còn là một nhà làm phim tài liệu xuất sắc. Hai chương trình nổi tiếng của ông là Anthony Bourdain: No Reservations (Travel Channel) và Parts Unknown (CNN).\r\n\r\nTháng 6-2018, ông được phát hiện đã tự tử tại một khách sạn ở Paris khi đang thực hiện chương trình Parts Unknown.",
        "public": true,
        "publish_date": "2018",
        "author": "Anthony Bourdain",
        "amount": 110,
        "number_of_page": 425,
        "sold": 1,
        "rating": 5,
        "price": 182000,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/i/m/image_184592.jpg",
        "slug": "bi-mat-nha-bep-gioi-dau-bep-va-nhung-chuyen-bep-nuc-dong-troi",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 14,
            "name": "TIỂU SỬ HỒI KÝ",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 256,
        "name": "Sống Mạo Hiểm Một Cách Cẩn Thận",
        "description": "Sống Mạo Hiểm Một Cách Cẩn Thận\r\n\r\nSiêu mẫu quốc tế Maye Musk đã chia sẻ những câu chuyện cá nhân cùng các bài học rút ra từ cuộc đời \"Sống mạo hiểm một cách cẩn thận.\"\r\n\r\nMaye Musk là một siêu mẫu thời trang, cuốn hút và thích xê dịch với những mối quan hệ khăng khít, đầy thú vị cùng gia đình và bạn bè - và năm nay bà đã ngoài bảy mươi tuổi. Nhưng mọi thứ không phải lúc nào cũng dễ dàng hay hào nhoáng - bà bắt đầu làm mẹ đơn thân ở tuổi 31, vật lộn với cái nghèo để nuôi dạy cho ba người con; đối mặt với những vấn đề về cân nặng khi làm một người mẫu quá khổ và vượt qua những định kiến về tuổi tác trong ngành người mẫu; đồng thời kiến lập một sự nghiệp trọn đời trong vai trò một chuyên gia dinh dưỡng được trọng vọng, mà trong suốt quá trình đó bà không ngừng bắt đầu lại ở nhiều thành phố khác nhau thuộc ba quốc gia và hai lục địa. Nhưng bà đã vượt qua tất cả với một tinh thần bất khuất và thái độ nghiêm túc để trở thành một người thành công trên toàn cầu ở độ tuổi mà bà gọi là \"đỉnh cao của đời tôi\".\r\n\r\nTrong Sống mạo hiểm một cách cẩn thận, Maye chia sẻ những kinh nghiệm của đời mình, hàm chứa trong đó các triết lý được đúc kết trong gian nan về sự nghiệp (càng chăm chỉ, càng may mắn), gia đình (để người mình yêu thương đi con đường riêng), sức khỏe (không hề có thần dược) và phiêu lưu (luôn tạo không gian cho sự khám phá, nhưng luôn sẵn sàng đón nhận bất kỳ điều gì). Bạn không kiểm soát mọi thứ xảy ra trong đời, nhưng bạn có thể sống cuộc đời mình muốn ở bất kỳ tuổi nào. Tất cả những gì bạn phải làm là lên kế hoạch.\r\n\r\nMột số đánh giá về cuốn sách:\r\n\r\n\"Từ lâu tôi đã ngưỡng mộ Maye Musk cả trong vai trò người mẫu lẫn một người phụ nữ. Bác đã truyền cảm hứng cho nhiều người xuyên suốt sự nghiệp của mình, và những triết lý cùng quan điểm vô giá của bác hiển hiện trên từng trang của cuốn sách này.\"   - Karlie Kloss\r\n\r\n\"Ấm áp, chân thành mà không giả dối, Sống mạo hiểm một cách cẩn thận chứa đầy những quan điểm sâu sắc cùng chất hài hước với hàm lượng hợp lý, mang lại cho người đọc những lời khuyên phải khó khăn lắm mới có được của cả đời người. Maye Musk là người phụ nữ trách nhiệm với hiểu biết rằng cuộc sống đầy những bất ngờ và làm chủ cuộc sống một cách trọn vẹn!\"  - Diane Von Furstenberg\r\n\r\n\"Mỹ nhân phi thường Maye Musk là bằng chứng sống cho thấy một chế độ ăn uống lành mạnh là nền tảng cho một cuộc sống đầy ắp niềm vui, năng động và giàu năng lượng.\"   - Christie Brinkle\r\n\r\nVỀ TÁC GIẢ\r\n\r\nMaye Musk Maye Musk sinh ngày 19 tháng Tư năm 1948 tại Canada. Bà là một siêu mẫu quốc tế, một chuyên gia dinh dưỡng - thực chế học được chứng nhận kiêm diễn giả toàn cầu.\r\n\r\nThời trẻ, bà từng lọt vào chung kết cuộc thi Hoa hậu Nam Phi nhưng nghề chính của bà là bác sĩ dinh dưỡng. Để có thêm tiền trang trải cho cuộc sống, bà còn làm nghề người mẫu.\r\n\r\nNăm 1970, bà kết hôn với ông Errol Musk và có với nhau ba người con, Elon, Kimbal và Tosca (trong đó nổi tiếng nhất chính là tỉ phú Elon Musk). Năm 1979, hai vợ chồng ly hôn và bà trở thành mẹ đơn thân, sau đó chuyển đến Canada sống cùng ba người con. Trong suốt hơn bảy mươi năm cuộc đời, dù trải qua nhiều khó khăn, Maye Musk vẫn nuôi dưỡng ba người con thành tài, có một cuộc sống hạnh phúc cùng sự nghiệp tương đối thành công, cho đến nay vẫn là người mẫu nổi tiếng, được nhiều người ngưỡng mộ.\r\n\r\nBà thường xuyên góp mặt trên những tạp chí thời trang lớn như Vanity Fair, Vogue, Cosmopolitan, Marie Claire và Allure, từng lên trang bìa New York Magazine cùng nhiều người khác. Sinh ra ở Canada, Maye chuyển đến sống ở Nam Phi nhiều năm và hiện tại đang cư ngụ ở Los Angeles, Mỹ.\r\n\r\nMã hàng\t8935275100457\r\nTên Nhà Cung Cấp\tHải Đăng\r\nTác giả\tMaye Musk\r\nNgười Dịch\tMinh Nhật\r\nNXB\tNXB Lao Động\r\nNăm XB\t2021\r\nNgôn Ngữ\tTiếng Việt\r\nTrọng lượng (gr)\t300\r\nKích Thước Bao Bì\t20.5 x 14.5 cm\r\nSố trang\t288\r\nHình thức\tBìa Mềm\r\nSản phẩm hiển thị trong\t\r\nHải Đăng\r\nSuper Sale Thương Hiệu\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Câu Chuyện Cuộc Đời bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nSống Mạo Hiểm Một Cách Cẩn Thận\r\n\r\nSiêu mẫu quốc tế Maye Musk đã chia sẻ những câu chuyện cá nhân cùng các bài học rút ra từ cuộc đời \"Sống mạo hiểm một cách cẩn thận.\"\r\n\r\nMaye Musk là một siêu mẫu thời trang, cuốn hút và thích xê dịch với những mối quan hệ khăng khít, đầy thú vị cùng gia đình và bạn bè - và năm nay bà đã ngoài bảy mươi tuổi. Nhưng mọi thứ không phải lúc nào cũng dễ dàng hay hào nhoáng - bà bắt đầu làm mẹ đơn thân ở tuổi 31, vật lộn với cái nghèo để nuôi dạy cho ba người con; đối mặt với những vấn đề về cân nặng khi làm một người mẫu quá khổ và vượt qua những định kiến về tuổi tác trong ngành người mẫu; đồng thời kiến lập một sự nghiệp trọn đời trong vai trò một chuyên gia dinh dưỡng được trọng vọng, mà trong suốt quá trình đó bà không ngừng bắt đầu lại ở nhiều thành phố khác nhau thuộc ba quốc gia và hai lục địa. Nhưng bà đã vượt qua tất cả với một tinh thần bất khuất và thái độ nghiêm túc để trở thành một người thành công trên toàn cầu ở độ tuổi mà bà gọi là \"đỉnh cao của đời tôi\".\r\n\r\nTrong Sống mạo hiểm một cách cẩn thận, Maye chia sẻ những kinh nghiệm của đời mình, hàm chứa trong đó các triết lý được đúc kết trong gian nan về sự nghiệp (càng chăm chỉ, càng may mắn), gia đình (để người mình yêu thương đi con đường riêng), sức khỏe (không hề có thần dược) và phiêu lưu (luôn tạo không gian cho sự khám phá, nhưng luôn sẵn sàng đón nhận bất kỳ điều gì). Bạn không kiểm soát mọi thứ xảy ra trong đời, nhưng bạn có thể sống cuộc đời mình muốn ở bất kỳ tuổi nào. Tất cả những gì bạn phải làm là lên kế hoạch.\r\n\r\nMột số đánh giá về cuốn sách:\r\n\r\n\"Từ lâu tôi đã ngưỡng mộ Maye Musk cả trong vai trò người mẫu lẫn một người phụ nữ. Bác đã truyền cảm hứng cho nhiều người xuyên suốt sự nghiệp của mình, và những triết lý cùng quan điểm vô giá của bác hiển hiện trên từng trang của cuốn sách này.\"   - Karlie Kloss\r\n\r\n\"Ấm áp, chân thành mà không giả dối, Sống mạo hiểm một cách cẩn thận chứa đầy những quan điểm sâu sắc cùng chất hài hước với hàm lượng hợp lý, mang lại cho người đọc những lời khuyên phải khó khăn lắm mới có được của cả đời người. Maye Musk là người phụ nữ trách nhiệm với hiểu biết rằng cuộc sống đầy những bất ngờ và làm chủ cuộc sống một cách trọn vẹn!\"  - Diane Von Furstenberg\r\n\r\n\"Mỹ nhân phi thường Maye Musk là bằng chứng sống cho thấy một chế độ ăn uống lành mạnh là nền tảng cho một cuộc sống đầy ắp niềm vui, năng động và giàu năng lượng.\"   - Christie Brinkle\r\n\r\nVỀ TÁC GIẢ\r\n\r\nMaye Musk Maye Musk sinh ngày 19 tháng Tư năm 1948 tại Canada. Bà là một siêu mẫu quốc tế, một chuyên gia dinh dưỡng - thực chế học được chứng nhận kiêm diễn giả toàn cầu.\r\n\r\nThời trẻ, bà từng lọt vào chung kết cuộc thi Hoa hậu Nam Phi nhưng nghề chính của bà là bác sĩ dinh dưỡng. Để có thêm tiền trang trải cho cuộc sống, bà còn làm nghề người mẫu.\r\n\r\nNăm 1970, bà kết hôn với ông Errol Musk và có với nhau ba người con, Elon, Kimbal và Tosca (trong đó nổi tiếng nhất chính là tỉ phú Elon Musk). Năm 1979, hai vợ chồng ly hôn và bà trở thành mẹ đơn thân, sau đó chuyển đến Canada sống cùng ba người con. Trong suốt hơn bảy mươi năm cuộc đời, dù trải qua nhiều khó khăn, Maye Musk vẫn nuôi dưỡng ba người con thành tài, có một cuộc sống hạnh phúc cùng sự nghiệp tương đối thành công, cho đến nay vẫn là người mẫu nổi tiếng, được nhiều người ngưỡng mộ.\r\n\r\nBà thường xuyên góp mặt trên những tạp chí thời trang lớn như Vanity Fair, Vogue, Cosmopolitan, Marie Claire và Allure, từng lên trang bìa New York Magazine cùng nhiều người khác. Sinh ra ở Canada, Maye chuyển đến sống ở Nam Phi nhiều năm và hiện tại đang cư ngụ ở Los Angeles, Mỹ.",
        "public": true,
        "publish_date": "2020",
        "author": "Maye Musk",
        "amount": 999,
        "number_of_page": 288,
        "sold": 1,
        "rating": 5,
        "price": 111000,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1-s_ng-m_o-hi_m.jpg",
        "slug": "song-mao-hiem-mot-cach-can-than",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 14,
            "name": "TIỂU SỬ HỒI KÝ",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 257,
        "name": "Trịnh Công Sơn - Thư Tình Gửi Một Người",
        "description": "Trịnh Công Sơn - Thư Tình Gửi Một Người\r\n\r\nTập Thư tình gửi một người của Nhà xuất bản Trẻ ra mắt nhân kỷ niệm mười năm ngày nhạc sĩ Trịnh Công Sơn từ trần (1/4/2001 - 1/4/2011); đầu sách này cũng ở trong số các ấn phẩm đặc biệt ra đời trong tháng kỷ niệm 30 năm ngày thành lập Nhà xuất bản Trẻ (1981 - 2011).\r\n\r\nThông qua những lá thư của nhạc sĩ Trịnh Công Sơn gửi cô gái Huế có tên Ngô Vũ Dao Ánh, người đọc không chỉ tìm thấy vẻ đẹp kỳ diệu của một tình yêu huyền nhiệm mà còn hiểu được những lo âu, dằn vặt triền miên của nhạc sĩ về kiếp người, về lòng tin và những điều tốt đẹp đang bị mai một dần trong cõi nhân gian. Bên cạnh gia tài đồ sộ về âm nhạc của Trịnh Công Sơn, đây có thể được xem là một áng văn chương thật ấn tượng trong đời hoạt động nghệ thuật của ông.\r\n\r\nTập Thư tình gửi một người này được thực hiện với hai loại ấn bản: thông thường và đặc biệt.\r\n\r\nTrong những lá thư, có khá nhiều từ tiếng Pháp cũng như có nhiều trích dẫn cần được chuyển sang Việt ngữ hoặc chú giải; công việc tạm dịch nghĩa và chú giải có thể chưa hoàn toàn chính xác với những gì nhạc sĩ Trịnh Công Sơn muốn nói trong thư. Rất mong được bạn đọc góp ý để nếu ấn phẩm tái bản trong tương lai sẽ hoàn chỉnh hơn.\r\n\r\nMã hàng\t8934974175230\r\nTên Nhà Cung Cấp\tNXB Trẻ\r\nTác giả\tTrịnh Công Sơn\r\nNXB\tNXB Trẻ\r\nNăm XB\t2022\r\nNgôn Ngữ\tTiếng Việt\r\nTrọng lượng (gr)\t504\r\nKích Thước Bao Bì\t26 x 23 x 1.6 cm\r\nSố trang\t356\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Nghệ Thuật - Giải Trí bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nTrịnh Công Sơn - Thư Tình Gửi Một Người\r\n\r\nTập Thư tình gửi một người của Nhà xuất bản Trẻ ra mắt nhân kỷ niệm mười năm ngày nhạc sĩ Trịnh Công Sơn từ trần (1/4/2001 - 1/4/2011); đầu sách này cũng ở trong số các ấn phẩm đặc biệt ra đời trong tháng kỷ niệm 30 năm ngày thành lập Nhà xuất bản Trẻ (1981 - 2011).\r\n\r\nThông qua những lá thư của nhạc sĩ Trịnh Công Sơn gửi cô gái Huế có tên Ngô Vũ Dao Ánh, người đọc không chỉ tìm thấy vẻ đẹp kỳ diệu của một tình yêu huyền nhiệm mà còn hiểu được những lo âu, dằn vặt triền miên của nhạc sĩ về kiếp người, về lòng tin và những điều tốt đẹp đang bị mai một dần trong cõi nhân gian. Bên cạnh gia tài đồ sộ về âm nhạc của Trịnh Công Sơn, đây có thể được xem là một áng văn chương thật ấn tượng trong đời hoạt động nghệ thuật của ông.\r\n\r\nTập Thư tình gửi một người này được thực hiện với hai loại ấn bản: thông thường và đặc biệt.\r\n\r\nTrong những lá thư, có khá nhiều từ tiếng Pháp cũng như có nhiều trích dẫn cần được chuyển sang Việt ngữ hoặc chú giải; công việc tạm dịch nghĩa và chú giải có thể chưa hoàn toàn chính xác với những gì nhạc sĩ Trịnh Công Sơn muốn nói trong thư. Rất mong được bạn đọc góp ý để nếu ấn phẩm tái bản trong tương lai sẽ hoàn chỉnh hơn.",
        "public": true,
        "publish_date": "2022",
        "author": "Trịnh Công Sơn",
        "amount": 0,
        "number_of_page": 356,
        "sold": 1,
        "rating": 5,
        "price": 165000,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/8/9/8934974175230.jpg",
        "slug": "trinh-cong-son-thu-tinh-gui-mot-nguoi",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 14,
            "name": "TIỂU SỬ HỒI KÝ",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 258,
        "name": "Kể Chuyện Cuộc Đời Các Thiên Tài: Albert Einstein - Tuổi Thơ Gian Khó Và Cuộc Đời Khoa Học Vĩ Đại",
        "description": "Cuốn sách gồm những âu chuyện viết về cuộc đời của nhà khoa học thiên tài Albert Einstein, người đã làm thay đổi cả thế giới cũng như quan niệm khoa học đương thời.\r\n\r\nDo xuất thân có nguồn gốc Do Thái nên ngay từ khi bắt đầu đi học Albert Einstein đã chịu nhiều sự phân biệt kì thị. Cuộc đời nghiên cứu khoa học của Albert Einstein cũng gặp nhiều khó khăn do hoàn cảnh khách quan và thời cuộc đem lại, nhưng bằng trí tuệ phi thường, ông đã cho ra những công trình nghiên cứu làm thay đổi khoa học hiện đại.\r\n\r\nVào năm 1999, ông được tạp chi Time của Mỹ vinh danh là con người của Thế kỷ. Trước khi qua đời, ông đã viết giấy hiến tặng bộ óc của mình cho các nhà nhân chủng học nghiên cứu. Đại văn hào Bernard Shaw đã gọi Albert Einstein là “VĨ NHÂN THỨ TÁM” của thế giới khoa học, sau Pythagoras, Aristotle, Ptolemy, Copernicus, Galileo, Kepler và Newton.",
        "public": true,
        "publish_date": "2020",
        "author": "Rasmus Hoài Nam",
        "amount": 158,
        "number_of_page": 158,
        "sold": 1,
        "rating": 5,
        "price": 47000,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/flashmagazine/images/page_images/ke_chuyen_cuoc_doi_cac_thien_tai_albert_einstein___tuoi_tho_gian_kho_va_cuoc_doi_khoa_hoc_vi_dai/2022_12_21_15_05_13_1-390x510.jpg",
        "slug": "ke-chuyen-cuoc-doi-cac-thien-tai-albert-einstein-tuoi-tho-gian-kho-va-cuoc-doi-khoa-hoc-vi-dai",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 14,
            "name": "TIỂU SỬ HỒI KÝ",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 259,
        "name": "Homo Deus - Lược Sử Tương Lai",
        "description": "Homo sapiens có phải là một dạng sống siêu đẳng, hay chỉ là một tay đầu gấu địa phương? Làm thế nào con người lại tin rằng họ không chỉ đã kiểm soát thế giới, mà còn mang lại ý nghĩa cho nó? Công nghệ sinh học và trí thông minh nhân tạo đe doạ loài người ra sao? Sinh vật nào có thể kế thừa loài người, và tôn giáo mới nào sẽ được sản sinh?\r\n\r\nVới giọng kể cuốn hút và mới lạ, Harari sẽ dần gợi mở và trả lời những câu hỏi trê, nhờ phân tích chi tiết những luận điểm gây nhiều tranh cãi: chủ nghĩa nhân đạo là một dạng tôn giáo, thứ tôn giáo tôn thờ con người thay vì thần thánh; sinh vật là thuật toán… ông vẽ ra một viễn cảnh tương lai khi Sapiens thất thế và Dữ liệu giáo trở thành một hình mẫu. HOMO DEUS còn bàn sâu hơn về các năng lực mà con người đã tự trang bị để sinh tồn và tiến hoá thành một giống loài ngự trị trên trái đất, để rồi chính trong tiến trình hoàn thiện và nâng cấp các năng lực ấy chúng ta sẽ bị truất quyền kiểm soát bởi một sinh vật mới, mang tên Homo Deus.\r\n\r\nMã hàng\t8935235216976\r\nTên Nhà Cung Cấp\tNhã Nam\r\nTác giả\tYuval Noah Harari\r\nNgười Dịch\tDương Ngọc Trà\r\nNXB\tNXB Thế Giới\r\nNăm XB\t2022\r\nTrọng lượng (gr)\t705\r\nKích Thước Bao Bì\t24 x 15 x 2.4 cm\r\nSố trang\t508\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Lịch Sử bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nHomo Deus - Lược Sử Tương Lai\r\n\r\nHomo sapiens có phải là một dạng sống siêu đẳng, hay chỉ là một tay đầu gấu địa phương? Làm thế nào con người lại tin rằng họ không chỉ đã kiểm soát thế giới, mà còn mang lại ý nghĩa cho nó? Công nghệ sinh học và trí thông minh nhân tạo đe doạ loài người ra sao? Sinh vật nào có thể kế thừa loài người, và tôn giáo mới nào sẽ được sản sinh?\r\n\r\nVới giọng kể cuốn hút và mới lạ, Harari sẽ dần gợi mở và trả lời những câu hỏi trê, nhờ phân tích chi tiết những luận điểm gây nhiều tranh cãi: chủ nghĩa nhân đạo là một dạng tôn giáo, thứ tôn giáo tôn thờ con người thay vì thần thánh; sinh vật là thuật toán… ông vẽ ra một viễn cảnh tương lai khi Sapiens thất thế và Dữ liệu giáo trở thành một hình mẫu. HOMO DEUS còn bàn sâu hơn về các năng lực mà con người đã tự trang bị để sinh tồn và tiến hoá thành một giống loài ngự trị trên trái đất, để rồi chính trong tiến trình hoàn thiện và nâng cấp các năng lực ấy chúng ta sẽ bị truất quyền kiểm soát bởi một sinh vật mới, mang tên Homo Deus.",
        "public": true,
        "publish_date": "2020",
        "author": "Yuval Noah Harari",
        "amount": 222,
        "number_of_page": 508,
        "sold": 1,
        "rating": 5,
        "price": 132000,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/flashmagazine/images/page_images/homo_deus___luoc_su_tuong_lai/2023_05_25_15_11_18_1-390x510.jpg",
        "slug": "homo-deus-luoc-su-tuong-lai",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 14,
            "name": "TIỂU SỬ HỒI KÝ",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 260,
        "name": "Điệp Viên Hoàn Hảo X6 - Phạm Xuân Ẩn - Bìa Cứng (Tái Bản 2022)",
        "description": "Trong nhiệm kỳ của Tổng thống Donald Trump, ước tính đã có 1.200 cuốn sách viết về ông. Đây là con số chưa từng có đối với một chính khách, điều đó để thấy rằng đề tài về tổng thống thứ 45 của nước Mỹ và cá nhân ông Donald Trump luôn được độc giả thế giới quan tâm. Vào tháng 7/2020, cuốn sách Quá nhiều và Không đủ: Gia đình tôi đã tạo nên người đàn ông nguy hiểm nhất thế giới như thế nào (tựa tiếng Anh: Too Much and Never Enough: How My Family Created the World's Most Dangerous Man) của tác giả Mary L. Trump được xuất bản, ngay lập tức đã bán được con số 1,3 triệu bản tại Mỹ trong tuần đầu ra mắt sách, bán bản quyền cho 12 quốc gia chỉ trong vòng 2 tuần sau đó, và sau khoảng 3 tháng, sách đã được in tới 20 lần.\r\n\r\nĐây là cuốn sách hồi kí do chính người cháu gái gọi Tổng thống Donald Trump bằng chú ruột viết về đại gia đình mình, qua đó lý giải người chú của bà đã trở thành người đe dọa nền y tế, ổn định kinh tế và kết cấu xã hội của thế giới như thế nào.\r\n\r\nThực tế, trong đại gia đình của Tổng thống Trump đã xảy ra những mâu thuẫn với đỉnh điểm là vụ kiện tranh chấp về quyền thừa kế một phần tài sản giữa một bên là tác giả Mary L. Trump cùng anh trai và một bên là những thành viên còn lại trong gia đình, đứng đầu là ông Donald Trump, vào những năm 2000-2001. Xuất phát từ những thực tế đó, cách nhìn nhận và mô tả của tác giả về đại gia đình mình và cá nhân Tổng thống Donald Trump tất yếu là lăng kính, góc nhìn của một người ở thế đối lập, kết hợp với những kiến giải của một người có kiến thức chuyên môn về tâm lý lâm sàng. Cuốn sách thuần túy kể lại những câu chuyện gia đình, tập trung vào các mối quan hệ của thế hệ trước (thế hệ cha chú và ông nội của tác giả). Hơn nữa, hình ảnh ông Donald Trump được khắc họa trong sách chủ yếu ở giai đoạn trước khi ông trở thành Tổng thống Hoa Kỳ, do đó, sách không hề đề cập đến những chính sách, đường lối đã được thực thi trong nhiệm kỳ Tổng thống của ông Donald Trump, cũng không bàn đến các quan điểm chính trị.\r\n\r\nĐã có nhiều chuyên gia tâm lý, học giả và phóng viên tìm cách phân tích những thiếu xót chí mạng của Donald J. Trump. Nhưng Mary L. Trump lại có được nền tảng giáo dục, góc nhìn sâu sắc và sự thân thiết cần thiết để hé lộ những điều tạo nên con người của Tổng thống thứ 45 Hoa Kỳ - Donald Trump, cũng như các thành viên khác trong gia đình bà. Chỉ riêng bà là có thể kể lại câu chuyện hấp dẫn này, không chỉ bởi bà có cái nhìn của người trong cuộc, mà còn bởi bà là thành viên duy nhất trong nhà Trump sẵn lòng kể cho mọi người biết sự thật về một trong những gia đình quyền lực nhất thế giới nhưng cũng không kém phần rối loạn.\r\n\r\nMã hàng\t8935210276674\r\nTên Nhà Cung Cấp\tTân Việt\r\nTác giả\tMARY L TRUM, PH D\r\nNgười Dịch\tNguyễn Xuân Hồng\r\nNXB\tNXB Dân Trí\r\nNăm XB\t2021\r\nTrọng lượng (gr)\t380\r\nKích Thước Bao Bì\t23 x 15 cm x 1.4\r\nSố trang\t283\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Câu Chuyện Cuộc Đời bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nTrong nhiệm kỳ của Tổng thống Donald Trump, ước tính đã có 1.200 cuốn sách viết về ông. Đây là con số chưa từng có đối với một chính khách, điều đó để thấy rằng đề tài về tổng thống thứ 45 của nước Mỹ và cá nhân ông Donald Trump luôn được độc giả thế giới quan tâm. Vào tháng 7/2020, cuốn sách Quá nhiều và Không đủ: Gia đình tôi đã tạo nên người đàn ông nguy hiểm nhất thế giới như thế nào (tựa tiếng Anh: Too Much and Never Enough: How My Family Created the World's Most Dangerous Man) của tác giả Mary L. Trump được xuất bản, ngay lập tức đã bán được con số 1,3 triệu bản tại Mỹ trong tuần đầu ra mắt sách, bán bản quyền cho 12 quốc gia chỉ trong vòng 2 tuần sau đó, và sau khoảng 3 tháng, sách đã được in tới 20 lần.\r\n\r\nĐây là cuốn sách hồi kí do chính người cháu gái gọi Tổng thống Donald Trump bằng chú ruột viết về đại gia đình mình, qua đó lý giải người chú của bà đã trở thành người đe dọa nền y tế, ổn định kinh tế và kết cấu xã hội của thế giới như thế nào.\r\n\r\nThực tế, trong đại gia đình của Tổng thống Trump đã xảy ra những mâu thuẫn với đỉnh điểm là vụ kiện tranh chấp về quyền thừa kế một phần tài sản giữa một bên là tác giả Mary L. Trump cùng anh trai và một bên là những thành viên còn lại trong gia đình, đứng đầu là ông Donald Trump, vào những năm 2000-2001. Xuất phát từ những thực tế đó, cách nhìn nhận và mô tả của tác giả về đại gia đình mình và cá nhân Tổng thống Donald Trump tất yếu là lăng kính, góc nhìn của một người ở thế đối lập, kết hợp với những kiến giải của một người có kiến thức chuyên môn về tâm lý lâm sàng. Cuốn sách thuần túy kể lại những câu chuyện gia đình, tập trung vào các mối quan hệ của thế hệ trước (thế hệ cha chú và ông nội của tác giả). Hơn nữa, hình ảnh ông Donald Trump được khắc họa trong sách chủ yếu ở giai đoạn trước khi ông trở thành Tổng thống Hoa Kỳ, do đó, sách không hề đề cập đến những chính sách, đường lối đã được thực thi trong nhiệm kỳ Tổng thống của ông Donald Trump, cũng không bàn đến các quan điểm chính trị.\r\n\r\nĐã có nhiều chuyên gia tâm lý, học giả và phóng viên tìm cách phân tích những thiếu xót chí mạng của Donald J. Trump. Nhưng Mary L. Trump lại có được nền tảng giáo dục, góc nhìn sâu sắc và sự thân thiết cần thiết để hé lộ những điều tạo nên con người của Tổng thống thứ 45 Hoa Kỳ - Donald Trump, cũng như các thành viên khác trong gia đình bà. Chỉ riêng bà là có thể kể lại câu chuyện hấp dẫn này, không chỉ bởi bà có cái nhìn của người trong cuộc, mà còn bởi bà là thành viên duy nhất trong nhà Trump sẵn lòng kể cho mọi người biết sự thật về một trong những gia đình quyền lực nhất thế giới nhưng cũng không kém phần rối loạn.",
        "public": true,
        "publish_date": "2021",
        "author": "Larry Berman",
        "amount": 1110,
        "number_of_page": 391,
        "sold": 1,
        "rating": 5,
        "price": 134000,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/8/9/8935086855720.jpg",
        "slug": "diep-vien-hoan-hao-x6-pham-xuan-an-bia-cung-tai-ban-2022",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 14,
            "name": "TIỂU SỬ HỒI KÝ",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 261,
        "name": "Quá Nhiều Và Không Đủ - Gia Đình Tôi Đã Tạo Nên Người Đàn Ông Nguy Hiểm Nhất Thế Giới Như Thế Nào?",
        "description": "Trong nhiệm kỳ của Tổng thống Donald Trump, ước tính đã có 1.200 cuốn sách viết về ông. Đây là con số chưa từng có đối với một chính khách, điều đó để thấy rằng đề tài về tổng thống thứ 45 của nước Mỹ và cá nhân ông Donald Trump luôn được độc giả thế giới quan tâm. Vào tháng 7/2020, cuốn sách Quá nhiều và Không đủ: Gia đình tôi đã tạo nên người đàn ông nguy hiểm nhất thế giới như thế nào (tựa tiếng Anh: Too Much and Never Enough: How My Family Created the World's Most Dangerous Man) của tác giả Mary L. Trump được xuất bản, ngay lập tức đã bán được con số 1,3 triệu bản tại Mỹ trong tuần đầu ra mắt sách, bán bản quyền cho 12 quốc gia chỉ trong vòng 2 tuần sau đó, và sau khoảng 3 tháng, sách đã được in tới 20 lần.\r\n\r\nĐây là cuốn sách hồi kí do chính người cháu gái gọi Tổng thống Donald Trump bằng chú ruột viết về đại gia đình mình, qua đó lý giải người chú của bà đã trở thành người đe dọa nền y tế, ổn định kinh tế và kết cấu xã hội của thế giới như thế nào.\r\n\r\nThực tế, trong đại gia đình của Tổng thống Trump đã xảy ra những mâu thuẫn với đỉnh điểm là vụ kiện tranh chấp về quyền thừa kế một phần tài sản giữa một bên là tác giả Mary L. Trump cùng anh trai và một bên là những thành viên còn lại trong gia đình, đứng đầu là ông Donald Trump, vào những năm 2000-2001. Xuất phát từ những thực tế đó, cách nhìn nhận và mô tả của tác giả về đại gia đình mình và cá nhân Tổng thống Donald Trump tất yếu là lăng kính, góc nhìn của một người ở thế đối lập, kết hợp với những kiến giải của một người có kiến thức chuyên môn về tâm lý lâm sàng. Cuốn sách thuần túy kể lại những câu chuyện gia đình, tập trung vào các mối quan hệ của thế hệ trước (thế hệ cha chú và ông nội của tác giả). Hơn nữa, hình ảnh ông Donald Trump được khắc họa trong sách chủ yếu ở giai đoạn trước khi ông trở thành Tổng thống Hoa Kỳ, do đó, sách không hề đề cập đến những chính sách, đường lối đã được thực thi trong nhiệm kỳ Tổng thống của ông Donald Trump, cũng không bàn đến các quan điểm chính trị.\r\n\r\nĐã có nhiều chuyên gia tâm lý, học giả và phóng viên tìm cách phân tích những thiếu xót chí mạng của Donald J. Trump. Nhưng Mary L. Trump lại có được nền tảng giáo dục, góc nhìn sâu sắc và sự thân thiết cần thiết để hé lộ những điều tạo nên con người của Tổng thống thứ 45 Hoa Kỳ - Donald Trump, cũng như các thành viên khác trong gia đình bà. Chỉ riêng bà là có thể kể lại câu chuyện hấp dẫn này, không chỉ bởi bà có cái nhìn của người trong cuộc, mà còn bởi bà là thành viên duy nhất trong nhà Trump sẵn lòng kể cho mọi người biết sự thật về một trong những gia đình quyền lực nhất thế giới nhưng cũng không kém phần rối loạn.\r\n\r\nMã hàng\t8935210276674\r\nTên Nhà Cung Cấp\tTân Việt\r\nTác giả\tMARY L TRUM, PH D\r\nNgười Dịch\tNguyễn Xuân Hồng\r\nNXB\tNXB Dân Trí\r\nNăm XB\t2021\r\nTrọng lượng (gr)\t380\r\nKích Thước Bao Bì\t23 x 15 cm x 1.4\r\nSố trang\t283\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Câu Chuyện Cuộc Đời bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nTrong nhiệm kỳ của Tổng thống Donald Trump, ước tính đã có 1.200 cuốn sách viết về ông. Đây là con số chưa từng có đối với một chính khách, điều đó để thấy rằng đề tài về tổng thống thứ 45 của nước Mỹ và cá nhân ông Donald Trump luôn được độc giả thế giới quan tâm. Vào tháng 7/2020, cuốn sách Quá nhiều và Không đủ: Gia đình tôi đã tạo nên người đàn ông nguy hiểm nhất thế giới như thế nào (tựa tiếng Anh: Too Much and Never Enough: How My Family Created the World's Most Dangerous Man) của tác giả Mary L. Trump được xuất bản, ngay lập tức đã bán được con số 1,3 triệu bản tại Mỹ trong tuần đầu ra mắt sách, bán bản quyền cho 12 quốc gia chỉ trong vòng 2 tuần sau đó, và sau khoảng 3 tháng, sách đã được in tới 20 lần.\r\n\r\nĐây là cuốn sách hồi kí do chính người cháu gái gọi Tổng thống Donald Trump bằng chú ruột viết về đại gia đình mình, qua đó lý giải người chú của bà đã trở thành người đe dọa nền y tế, ổn định kinh tế và kết cấu xã hội của thế giới như thế nào.\r\n\r\nThực tế, trong đại gia đình của Tổng thống Trump đã xảy ra những mâu thuẫn với đỉnh điểm là vụ kiện tranh chấp về quyền thừa kế một phần tài sản giữa một bên là tác giả Mary L. Trump cùng anh trai và một bên là những thành viên còn lại trong gia đình, đứng đầu là ông Donald Trump, vào những năm 2000-2001. Xuất phát từ những thực tế đó, cách nhìn nhận và mô tả của tác giả về đại gia đình mình và cá nhân Tổng thống Donald Trump tất yếu là lăng kính, góc nhìn của một người ở thế đối lập, kết hợp với những kiến giải của một người có kiến thức chuyên môn về tâm lý lâm sàng. Cuốn sách thuần túy kể lại những câu chuyện gia đình, tập trung vào các mối quan hệ của thế hệ trước (thế hệ cha chú và ông nội của tác giả). Hơn nữa, hình ảnh ông Donald Trump được khắc họa trong sách chủ yếu ở giai đoạn trước khi ông trở thành Tổng thống Hoa Kỳ, do đó, sách không hề đề cập đến những chính sách, đường lối đã được thực thi trong nhiệm kỳ Tổng thống của ông Donald Trump, cũng không bàn đến các quan điểm chính trị.\r\n\r\nĐã có nhiều chuyên gia tâm lý, học giả và phóng viên tìm cách phân tích những thiếu xót chí mạng của Donald J. Trump. Nhưng Mary L. Trump lại có được nền tảng giáo dục, góc nhìn sâu sắc và sự thân thiết cần thiết để hé lộ những điều tạo nên con người của Tổng thống thứ 45 Hoa Kỳ - Donald Trump, cũng như các thành viên khác trong gia đình bà. Chỉ riêng bà là có thể kể lại câu chuyện hấp dẫn này, không chỉ bởi bà có cái nhìn của người trong cuộc, mà còn bởi bà là thành viên duy nhất trong nhà Trump sẵn lòng kể cho mọi người biết sự thật về một trong những gia đình quyền lực nhất thế giới nhưng cũng không kém phần rối loạn.",
        "public": true,
        "publish_date": "2021",
        "author": "MARY L TRUM, PH D",
        "amount": 50,
        "number_of_page": 283,
        "sold": 1,
        "rating": 5,
        "price": 67000,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/flashmagazine/images/page_images/qua_nhieu_va_khong_du___gia_dinh_toi_da_tao_nen_nguoi_dan_ong_nguy_hiem_nhat_the_gioi_nhu_the_nao/2022_02_23_13_50_08_1-390x510.png",
        "slug": "qua-nhieu-va-khong-du-gia-dinh-toi-da-tao-nen-nguoi-dan-ong-nguy-hiem-nhat-the-gioi-nhu-the-nao",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 14,
            "name": "TIỂU SỬ HỒI KÝ",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 262,
        "name": "Sói Già Phố Wall (Phần 2) - Tái Bản 2021",
        "description": "SÓI GIÀ PHỐ WALL PHẦN II\r\n\r\nCuốn hồi ký không nên đọc ngắt quãng được viết bởi “Chủ nhân trẻ của vũ trụ phố Wall”\r\n\r\nSói già Phố Wall là cuốn tự truyện của Jordan Belfort - một huyền thoại trong ngành môi giới chứng khoán trên sàn phố Wall. Tác phẩm kể về quá trình phất lên của Jordan nói riêng, cũng như nội tình cuộc đại khủng hoảng tín dụng thứ cấp ở Mỹ nói chung.\r\n\r\nĐược mọi người gọi với nhiều biệt danh, trong đó, cái tên Sói Già Phố Wall là hợp với Jordan hơn cả - một con sói tối thượng đội lốt cừu non. Ngoại hình và cách hành xử của anh ta trông giống như một đứa trẻ nhưng thực chất, anh ta đâu có trẻ con. Anh ta là một thằng đàn ông ba mươi mốt tuổi nhưng già đời như một lão sáu mươi, \"sống theo thang tuổi của loài chó\" - một năm bằng bảy năm tuổi người.Vừa tốt nghiệp đại học, bước vào khởi nghiệp, Jordan Belford đã gặp ngay thất bại đầu đời trên phố Wall, bởi anh ta mới chỉ là “cừu non” giữa bao “sói già” khác vây quanh. Chàng trai có cặp mắt xanh, cái miệng dẻo quẹo, cao chỉ tầm một thước bảy chẳng còn cách nào khác, phải chuyển hướng để kiếm việc. Anh ta tìm đến một công ty bé xíu để thử vận may.\r\n\r\nChính nơi làm việc vô danh tiểu tốt này đã nhanh chóng trở thành “vườn ươm” cho tài năng bán hàng và môi giới của anh chàng Jordan Belford hiếu thắng, nhanh nhẹn, nhiều mưu lược. Cũng từ đây, gã trùm tài chính tương lai dần thọc tay vào nhiều ngõ ngách của thế giới phù hoa, hào nhoáng, gia nhập đội ngũ “buôn tiền” khét tiếng, từng bước khuynh đảo thị tường chứng khoán phố Wall.Sớm trở nên giàu có sau những vụ IPO nổi đình đám, nâng giá cổ phiếu từ “rác” trở thành “vàng”, đại gia Jordan Belford đã vượt mặt những tay trùm từng một thời vênh váo, biết chống chịu với những cơn stress trong cái nghề đầy áp lực. Với rất nhiều mánh lới trong kinh doanh, Sói Già đã trở thành triệu phú thị trường chứng khoán ở tuổi hai mươi sáu, bị kết án ở cấp liên bang năm ba mươi sáu tuổi. Anh ta tiệc tùng như một ngôi sao nhạc rock, sống như một ông hoàng và bước qua mọi thăng trầm của đời mình như một biểu tượng của các doanh nhân nước Mỹ. Từ một cậu bé bán kem dạo trong những kỳ nghỉ hè ở Italia, Jordan trở thành người có thể kiếm hàng triệu đô trong phút chốc bằng những mánh lới xoay đủ chiều, có khi còn lợi dụng cả những người thân bên mình. Anh ta cũng sớm học được cách nốc rượu thay nước lọc, chơi cocain, bao gái, và tiệc tùng lõa thể thâu đêm suốt sáng. Là con “sói già” vô cùng tỉnh táo trên thương trường, nhưng trong đời riêng, không ít lần hắn rơi vào cảm giác vô thức. Trong cuộc đời Jordan Belford, dẫu từng có bao gái đẹp vây quanh, nhưng kết cục vẫn là “từng người tình đã bỏ ta đi”.\r\n\r\nSói Già cũng có gia đình. Ly hôn với người vợ đầu - người đã gắn bó khăng khít với anh ta khi còn hàn vi, Jordan cưới ngay một cô gái làm người mẫu quảng cáo cho một hãng bia bởi vẻ đẹp hớp hồn của cô ta. Họ cùng hai đứa con xinh xắn chung sống trong một ngôi nhà đồ sộ, đội ngũ người hầu hai hai người làm việc toàn thời gian, hai vệ sĩ tận tụy cũng những chiếc camera lắp đặt ở mọi nơi, tất cả những đồ vật trong nhà, cho dù những thứ nhỏ nhặt, đều được mua với giá ít nhất là vài nghìn đô la.\r\n\r\nNhững phi vụ tài chính của Sói Già trót lọt trong cả chục năm trời. Cuối cùng, sau hơn năm năm kể từ lúc bị Ủy ban Chứng khoán và Hối đoái truy tố, Jordan mới thật sự phải vào tù - chịu án hai mươi hai tháng tại một trại giam cấp liên bang. Gia đình anh ta cũng đổ vỡ khi người vợ xinh đẹp quyết định ly hôn.\r\n\r\nSói già phố Wall không đơn thuần là một cuốn hồi ký. Nó giống như một lời cảnh báo của Jordan Belfort về ngành tài chính, chứng khoán phố Wall, sự tham lam của các nhà đầu cơ, những nguy hiểm tiềm tang trên con đường danh vọng. Trong cuốn sách này, ông cũng đã trực tiếp nhìn nhận những sai lầm trong quá khứ của chính mình, từ đó thẳng thắn lên án và vạch trần lối sống xa hoa vô độ, dâm dục của một bộ phận lớn tư bản Mỹ.\r\n\r\nTHÔNG TIN TÁC GIẢ\r\n\r\nJordan Belfort là chuyên gia tư vấn cho hơn 50 công ty và viết bài cho nhiều báo, tạp chí uy tín trên thế giới, trong đó có The New York Times, The Wall Street Journal, The Los Angeles Times, The London Times, The Herald Tribune, Le Monde, Corriere della Serra, Forbes, Business Week, Paris Match, Rolling Stone.\r\n\r\nCuốn tự truyện của ông đã được xuất bản tại hơn 40 quốc gia và dịch ra 18 ngôn ngữ khác nhau. Ông là khách mời thường xuyên trên các đài CNN, CNBC, BBC,…. Câu chuyện cuộc đời ông đã được đạo diễn Scorsese chuyển thể thành phim và công chiếu rất rộng rãi từ cuối 2013. Bộ phim có sự tham gia của tài từ Leonardo Di Caprio trong vai Jordan Belfort.\r\n\r\nMã hàng\t9786049957543\r\nTên Nhà Cung Cấp\tBách Việt\r\nTác giả\tJordan Belfort\r\nNgười Dịch\tNguyễn Xuân Hồng\r\nNXB\tNXB Lao Động\r\nNăm XB\t2021\r\nTrọng lượng (gr)\t650\r\nKích Thước Bao Bì\t24 x 16 cm\r\nSố trang\t632\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Kinh Tế bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nSÓI GIÀ PHỐ WALL PHẦN II\r\n\r\nCuốn hồi ký không nên đọc ngắt quãng được viết bởi “Chủ nhân trẻ của vũ trụ phố Wall”\r\n\r\nSói già Phố Wall là cuốn tự truyện của Jordan Belfort - một huyền thoại trong ngành môi giới chứng khoán trên sàn phố Wall. Tác phẩm kể về quá trình phất lên của Jordan nói riêng, cũng như nội tình cuộc đại khủng hoảng tín dụng thứ cấp ở Mỹ nói chung.\r\n\r\nĐược mọi người gọi với nhiều biệt danh, trong đó, cái tên Sói Già Phố Wall là hợp với Jordan hơn cả - một con sói tối thượng đội lốt cừu non. Ngoại hình và cách hành xử của anh ta trông giống như một đứa trẻ nhưng thực chất, anh ta đâu có trẻ con. Anh ta là một thằng đàn ông ba mươi mốt tuổi nhưng già đời như một lão sáu mươi, \"sống theo thang tuổi của loài chó\" - một năm bằng bảy năm tuổi người.Vừa tốt nghiệp đại học, bước vào khởi nghiệp, Jordan Belford đã gặp ngay thất bại đầu đời trên phố Wall, bởi anh ta mới chỉ là “cừu non” giữa bao “sói già” khác vây quanh. Chàng trai có cặp mắt xanh, cái miệng dẻo quẹo, cao chỉ tầm một thước bảy chẳng còn cách nào khác, phải chuyển hướng để kiếm việc. Anh ta tìm đến một công ty bé xíu để thử vận may.\r\n\r\nChính nơi làm việc vô danh tiểu tốt này đã nhanh chóng trở thành “vườn ươm” cho tài năng bán hàng và môi giới của anh chàng Jordan Belford hiếu thắng, nhanh nhẹn, nhiều mưu lược. Cũng từ đây, gã trùm tài chính tương lai dần thọc tay vào nhiều ngõ ngách của thế giới phù hoa, hào nhoáng, gia nhập đội ngũ “buôn tiền” khét tiếng, từng bước khuynh đảo thị tường chứng khoán phố Wall.Sớm trở nên giàu có sau những vụ IPO nổi đình đám, nâng giá cổ phiếu từ “rác” trở thành “vàng”, đại gia Jordan Belford đã vượt mặt những tay trùm từng một thời vênh váo, biết chống chịu với những cơn stress trong cái nghề đầy áp lực. Với rất nhiều mánh lới trong kinh doanh, Sói Già đã trở thành triệu phú thị trường chứng khoán ở tuổi hai mươi sáu, bị kết án ở cấp liên bang năm ba mươi sáu tuổi. Anh ta tiệc tùng như một ngôi sao nhạc rock, sống như một ông hoàng và bước qua mọi thăng trầm của đời mình như một biểu tượng của các doanh nhân nước Mỹ. Từ một cậu bé bán kem dạo trong những kỳ nghỉ hè ở Italia, Jordan trở thành người có thể kiếm hàng triệu đô trong phút chốc bằng những mánh lới xoay đủ chiều, có khi còn lợi dụng cả những người thân bên mình. Anh ta cũng sớm học được cách nốc rượu thay nước lọc, chơi cocain, bao gái, và tiệc tùng lõa thể thâu đêm suốt sáng. Là con “sói già” vô cùng tỉnh táo trên thương trường, nhưng trong đời riêng, không ít lần hắn rơi vào cảm giác vô thức. Trong cuộc đời Jordan Belford, dẫu từng có bao gái đẹp vây quanh, nhưng kết cục vẫn là “từng người tình đã bỏ ta đi”.\r\n\r\nSói Già cũng có gia đình. Ly hôn với người vợ đầu - người đã gắn bó khăng khít với anh ta khi còn hàn vi, Jordan cưới ngay một cô gái làm người mẫu quảng cáo cho một hãng bia bởi vẻ đẹp hớp hồn của cô ta. Họ cùng hai đứa con xinh xắn chung sống trong một ngôi nhà đồ sộ, đội ngũ người hầu hai hai người làm việc toàn thời gian, hai vệ sĩ tận tụy cũng những chiếc camera lắp đặt ở mọi nơi, tất cả những đồ vật trong nhà, cho dù những thứ nhỏ nhặt, đều được mua với giá ít nhất là vài nghìn đô la.\r\n\r\nNhững phi vụ tài chính của Sói Già trót lọt trong cả chục năm trời. Cuối cùng, sau hơn năm năm kể từ lúc bị Ủy ban Chứng khoán và Hối đoái truy tố, Jordan mới thật sự phải vào tù - chịu án hai mươi hai tháng tại một trại giam cấp liên bang. Gia đình anh ta cũng đổ vỡ khi người vợ xinh đẹp quyết định ly hôn.\r\n\r\nSói già phố Wall không đơn thuần là một cuốn hồi ký. Nó giống như một lời cảnh báo của Jordan Belfort về ngành tài chính, chứng khoán phố Wall, sự tham lam của các nhà đầu cơ, những nguy hiểm tiềm tang trên con đường danh vọng. Trong cuốn sách này, ông cũng đã trực tiếp nhìn nhận những sai lầm trong quá khứ của chính mình, từ đó thẳng thắn lên án và vạch trần lối sống xa hoa vô độ, dâm dục của một bộ phận lớn tư bản Mỹ.\r\n\r\nTHÔNG TIN TÁC GIẢ\r\n\r\nJordan Belfort là chuyên gia tư vấn cho hơn 50 công ty và viết bài cho nhiều báo, tạp chí uy tín trên thế giới, trong đó có The New York Times, The Wall Street Journal, The Los Angeles Times, The London Times, The Herald Tribune, Le Monde, Corriere della Serra, Forbes, Business Week, Paris Match, Rolling Stone.\r\n\r\nCuốn tự truyện của ông đã được xuất bản tại hơn 40 quốc gia và dịch ra 18 ngôn ngữ khác nhau. Ông là khách mời thường xuyên trên các đài CNN, CNBC, BBC,…. Câu chuyện cuộc đời ông đã được đạo diễn Scorsese chuyển thể thành phim và công chiếu rất rộng rãi từ cuối 2013. Bộ phim có sự tham gia của tài từ Leonardo Di Caprio trong vai Jordan Belfort.\r\n\r\n",
        "public": true,
        "publish_date": "2021",
        "author": "Jordan Belfort",
        "amount": 100,
        "number_of_page": 632,
        "sold": 1,
        "rating": 5,
        "price": 152000,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/i/m/image_222089.jpg",
        "slug": "soi-gia-pho-wall-phan-2-tai-ban-2021",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 14,
            "name": "TIỂU SỬ HỒI KÝ",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 263,
        "name": "Kể Chuyện Cuộc Đời Các Thiên Tài: Leonardo Da Vinci - Thiên Tài Toàn Năng",
        "description": "Cuốn sách kể về cuộc đời của thiên tài Leonardo da Vinci, theo diễn biến thời gian, từ khi sinh ra ở xứ Vinci, đến khi lớn lên theo cha đến Florence, rồi học việc tại xưởng vẽ của họa sĩ tài danh nhất tại đây –  Andrea del Verrocchio. Khi đạt được những thành công nhất định, Leonardo rời Florence đến Milan, rồi từ đó, ông sống cuộc sống nay đây mai đó, di chuyển qua lại giữa các cung điện khắp nước Ý.\r\n\r\nÔng là một trong những đại diện xuất sắc nhất của nghệ thuật và khoa học thời kì Phục Hưng. Leonardo da Vinci không chỉ đam mê hội họa mà còn quan tâm nghiên cứu và tiến hành giải phẫu để tìm hiểu cơ chế vận động của cơ thể người nhằm vẽ tranh chân dung đạt được tính chân thực và sống động nhất.\r\n\r\nNgoài ra, ông còn để lại rất nhiều ghi chép về các lĩnh vực từ nghệ thuật, khoa học đến triết học như nghiên cứu sinh vật, kiến trúc, tranh vẽ, tàu ngầm, máy đo độ ẩm, máy hơi nước, dù lượn, vũ khí…\r\n\r\nLeonardo da Vinci sinh ngày 15 tháng 4 năm 1452, mất ngày 2 tháng 5 năm 1519. Ông là họa sĩ, nhà điêu khắc, kiến trúc sư, nhạc sĩ, bác sĩ, kĩ sư, nhà giải phẫu, nhà phát minh và triết học tự nhiên người Ý. Tuy nhiên, ông được biết đến nhiều nhất trong lĩnh vực hội họa với những kiệt tác như Mona Lisa, Bữa ăn tối cuối cùng… Ngoài nghệ thuật, Leonardo da Vinci còn nghiên cứu tất cả các khía cạnh của cuộc sống, từ giải phẫu học đến toán học và thiên văn học, ông xứng đáng là thiên tài toàn năng nhất lịch sử nhân loại.\r\n\r\nMã hàng\t8935210274762\r\nTên Nhà Cung Cấp\tTân Việt\r\nTác giả\tRasmus Hoài Nam\r\nNXB\tNXB Thanh Niên\r\nNăm XB\t2021\r\nTrọng lượng (gr)\t210\r\nKích Thước Bao Bì\t20.5 x 14.5 cm x 0.9\r\nSố trang\t174\r\nHình thức\tBìa Mềm\r\nSản phẩm hiển thị trong\t\r\nTân Việt\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Câu Chuyện Cuộc Đời bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nCuốn sách kể về cuộc đời của thiên tài Leonardo da Vinci, theo diễn biến thời gian, từ khi sinh ra ở xứ Vinci, đến khi lớn lên theo cha đến Florence, rồi học việc tại xưởng vẽ của họa sĩ tài danh nhất tại đây –  Andrea del Verrocchio. Khi đạt được những thành công nhất định, Leonardo rời Florence đến Milan, rồi từ đó, ông sống cuộc sống nay đây mai đó, di chuyển qua lại giữa các cung điện khắp nước Ý.\r\n\r\nÔng là một trong những đại diện xuất sắc nhất của nghệ thuật và khoa học thời kì Phục Hưng. Leonardo da Vinci không chỉ đam mê hội họa mà còn quan tâm nghiên cứu và tiến hành giải phẫu để tìm hiểu cơ chế vận động của cơ thể người nhằm vẽ tranh chân dung đạt được tính chân thực và sống động nhất.\r\n\r\nNgoài ra, ông còn để lại rất nhiều ghi chép về các lĩnh vực từ nghệ thuật, khoa học đến triết học như nghiên cứu sinh vật, kiến trúc, tranh vẽ, tàu ngầm, máy đo độ ẩm, máy hơi nước, dù lượn, vũ khí…\r\n\r\nLeonardo da Vinci sinh ngày 15 tháng 4 năm 1452, mất ngày 2 tháng 5 năm 1519. Ông là họa sĩ, nhà điêu khắc, kiến trúc sư, nhạc sĩ, bác sĩ, kĩ sư, nhà giải phẫu, nhà phát minh và triết học tự nhiên người Ý. Tuy nhiên, ông được biết đến nhiều nhất trong lĩnh vực hội họa với những kiệt tác như Mona Lisa, Bữa ăn tối cuối cùng… Ngoài nghệ thuật, Leonardo da Vinci còn nghiên cứu tất cả các khía cạnh của cuộc sống, từ giải phẫu học đến toán học và thiên văn học, ông xứng đáng là thiên tài toàn năng nhất lịch sử nhân loại.",
        "public": true,
        "publish_date": "2021",
        "author": "Rasmus Hoài Nam",
        "amount": 300,
        "number_of_page": 174,
        "sold": 1,
        "rating": 5,
        "price": 51000,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/flashmagazine/images/page_images/ke_chuyen_cuoc_doi_cac_thien_tai_leonardo_da_vinci___thien_tai_toan_nang/2022_12_23_11_17_50_1-390x510.jpg",
        "slug": "ke-chuyen-cuoc-doi-cac-thien-tai-leonardo-da-vinci-thien-tai-toan-nang",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 14,
            "name": "TIỂU SỬ HỒI KÝ",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 264,
        "name": "Hòn Tuyết Lăn - Cuộc Đời Và Sự Nghiệp Của Warren Buffett",
        "description": "Hòn Tuyết Lăn - Cuộc Đời Và Sự Nghiệp Của Warren Buffett\r\n\r\nGiờ đây, cái tên Warren Buffett không còn mấy xa lạ với mọi người ở khắp các châu lục, bởi vì con người này có một tầm ảnh hưởng vô cùng rộng lớn và luôn có mặt trong danh sách những người giàu nhất thế giới suốt hai thập kỷ vừa qua.\r\n\r\nSong, ít ai biết rằng, vị tỷ phú 80 tuổi đáng kính ấy, “nhà hiền triết vùng Omaha” của Hoa Kỳ thuở thiếu thời lại là một cậu học sinh thường bị điểm kém, từng bỏ nhà đi hoang, nhiều lần tham gia đánh cắp những món đồ thể thao từ cửa hiệu Sears, điều hành một lộ trình giao báo năm 13 tuổi, mua một trang trại 40 mẫu Anh vào năm học lớp 10, bị trường Harvard từ chối, có một cuộc tình “đầy sóng gió” với Hoa hậu Nebraska 1949 Vanita Mae Brown, từng là một “tín đồ” trung thành có thâm niên hàng chục năm của Pepsi trước khi chuyển sang uống Cherry Coke của Coca-cola từ năm 1987, kết thân và xem vợ chồng tỷ phú số 1 thế giới 2009 Bill Gates và Melinda Gates gần như con ruột nhưng không bao giờ đầu tư một đồng vào “đế chế” Microsoft hùng mạnh, cùng vô số những thương vụ đầy táo bạo mang đến cho ông những thành công tột bậc (và một vài thất bại “nho nhỏ”) dọc theo chiều dài sự nghiệp của ông... cho đến khi đọc The Snowball - Hòn Tuyết Lăn, quyển tự truyện về cuộc đời và sự nghiệp của Warren Buffett do Alice Shroeder chấp bút theo đề nghị của chính ông.\r\n\r\n---------------------\r\n\r\nMặc dù buổi sáng cuối xuân Omaha quyến rũ đang vẫy gọi bên ngoài cửa sổ, nhưng những chiếc lá sách gỗ màu nâu vẫn được đóng kín. Chiếc ti-vi hướng màn hình về phía bàn làm việc của ông được chuyển sang kênh CNBC, âm thanh luôn được đặt ở chế độ không tiếng, những hàng tin tức chạy liên tục bên dưới chân màn hình mới chính là “món ăn” hằng ngày của ông. Năm này sang năm khác, ông rất vui vì hầu hết các thông tin này thường có liên quan đến ông.\r\n\r\nTuy nhiên, chỉ một vài người thực sự hiểu rõ ông. Tôi quen ông từ sáu năm trước, ban đầu với tư cách là một chuyên viên phân tích tài chính chịu trách nhiệm về cổ phiếu của Berkshire Hathaway. Theo thời gian, mối quan hệ giữa chúng tôi trở nên thân tình và tôi ngày càng hiểu rõ ông hơn. Lúc này, chúng tôi đang ngồi trong phòng làm việc của ông bởi ông không có ý định tự mình viết quyển sách này. Đôi lông mày bướng bỉnh như nhấn mạnh thêm lời ông nói: “Alice, cô làm việc này tốt hơn tôi. Tôi rất vui vì cô đã nhận viết quyển sách này.” Tại sao ông vẫn cố tình nói ra điều tưởng đã rất hiển nhiên đó giữa hai chúng tôi? Bởi vì, chúng tôi bắt đầu cuốn sách từ những gì gần gũi nhất trong trái tim ông.\r\n\r\n“Mọi việc bắt đầu như thế nào, Warren? Có phải đó là sự thôi thúc mạnh mẽ trong việc kiếm được thật nhiều tiền?”\r\n\r\nÁnh mắt ông thoáng vẻ xa xăm và những ý nghĩ bỗng dồn dập ùa về trong ký ức. Warren mở đầu câu chuyện cuộc đời ông thế này:\r\n\r\n- Balzac nói rằng đằng sau mỗi gia tài là một tội ác, điều đó không đúng tại Berkshire này.\r\n\r\nWarren đứng dậy khỏi bàn làm việc và sải bước ngang phòng như để đánh thức dòng hồi tưởng. Rồi ông an tọa trong chiếc ghế bành bọc gấm viền những sợi kim tuyến vàng óng, nghiêng người về phía trước trông giống như một cậu học trò nhỏ đang tự hào kể về mối tình đầu đẹp đẽ của mình hơn là một nhà tư bản tài chính lừng lẫy thế giới bảy-mươi-hai-tuổi. Câu chuyện sẽ được diễn giải như thế nào, tôi cần phải phỏng vấn những ai, bao nhiêu người và sẽ viết gì đây? Warren nói rằng tất cả đều do tôi quyết định.\r\n\r\nMã hàng\t9786043025309\r\nNhà Cung Cấp\tCty Sách Dân Trí\r\nTác giả\tAlice Schroeder\r\nNgười Dịch\tVương Bảo Long\r\nNXB\tNXB Hồng Đức\r\nNăm XB\t2021\r\nNgôn Ngữ\tTiếng Việt\r\nTrọng lượng (gr)\t1500\r\nKích Thước Bao Bì\t24 x 16 x 5.3 cm\r\nSố trang\t1303\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Câu Chuyện Cuộc Đời bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nHòn Tuyết Lăn - Cuộc Đời Và Sự Nghiệp Của Warren Buffett\r\n\r\nGiờ đây, cái tên Warren Buffett không còn mấy xa lạ với mọi người ở khắp các châu lục, bởi vì con người này có một tầm ảnh hưởng vô cùng rộng lớn và luôn có mặt trong danh sách những người giàu nhất thế giới suốt hai thập kỷ vừa qua.\r\n\r\nSong, ít ai biết rằng, vị tỷ phú 80 tuổi đáng kính ấy, “nhà hiền triết vùng Omaha” của Hoa Kỳ thuở thiếu thời lại là một cậu học sinh thường bị điểm kém, từng bỏ nhà đi hoang, nhiều lần tham gia đánh cắp những món đồ thể thao từ cửa hiệu Sears, điều hành một lộ trình giao báo năm 13 tuổi, mua một trang trại 40 mẫu Anh vào năm học lớp 10, bị trường Harvard từ chối, có một cuộc tình “đầy sóng gió” với Hoa hậu Nebraska 1949 Vanita Mae Brown, từng là một “tín đồ” trung thành có thâm niên hàng chục năm của Pepsi trước khi chuyển sang uống Cherry Coke của Coca-cola từ năm 1987, kết thân và xem vợ chồng tỷ phú số 1 thế giới 2009 Bill Gates và Melinda Gates gần như con ruột nhưng không bao giờ đầu tư một đồng vào “đế chế” Microsoft hùng mạnh, cùng vô số những thương vụ đầy táo bạo mang đến cho ông những thành công tột bậc (và một vài thất bại “nho nhỏ”) dọc theo chiều dài sự nghiệp của ông... cho đến khi đọc The Snowball - Hòn Tuyết Lăn, quyển tự truyện về cuộc đời và sự nghiệp của Warren Buffett do Alice Shroeder chấp bút theo đề nghị của chính ông.\r\n\r\n---------------------\r\n\r\nMặc dù buổi sáng cuối xuân Omaha quyến rũ đang vẫy gọi bên ngoài cửa sổ, nhưng những chiếc lá sách gỗ màu nâu vẫn được đóng kín. Chiếc ti-vi hướng màn hình về phía bàn làm việc của ông được chuyển sang kênh CNBC, âm thanh luôn được đặt ở chế độ không tiếng, những hàng tin tức chạy liên tục bên dưới chân màn hình mới chính là “món ăn” hằng ngày của ông. Năm này sang năm khác, ông rất vui vì hầu hết các thông tin này thường có liên quan đến ông.\r\n\r\nTuy nhiên, chỉ một vài người thực sự hiểu rõ ông. Tôi quen ông từ sáu năm trước, ban đầu với tư cách là một chuyên viên phân tích tài chính chịu trách nhiệm về cổ phiếu của Berkshire Hathaway. Theo thời gian, mối quan hệ giữa chúng tôi trở nên thân tình và tôi ngày càng hiểu rõ ông hơn. Lúc này, chúng tôi đang ngồi trong phòng làm việc của ông bởi ông không có ý định tự mình viết quyển sách này. Đôi lông mày bướng bỉnh như nhấn mạnh thêm lời ông nói: “Alice, cô làm việc này tốt hơn tôi. Tôi rất vui vì cô đã nhận viết quyển sách này.” Tại sao ông vẫn cố tình nói ra điều tưởng đã rất hiển nhiên đó giữa hai chúng tôi? Bởi vì, chúng tôi bắt đầu cuốn sách từ những gì gần gũi nhất trong trái tim ông.\r\n\r\n“Mọi việc bắt đầu như thế nào, Warren? Có phải đó là sự thôi thúc mạnh mẽ trong việc kiếm được thật nhiều tiền?”\r\n\r\nÁnh mắt ông thoáng vẻ xa xăm và những ý nghĩ bỗng dồn dập ùa về trong ký ức. Warren mở đầu câu chuyện cuộc đời ông thế này:\r\n\r\n- Balzac nói rằng đằng sau mỗi gia tài là một tội ác, điều đó không đúng tại Berkshire này.\r\n\r\nWarren đứng dậy khỏi bàn làm việc và sải bước ngang phòng như để đánh thức dòng hồi tưởng. Rồi ông an tọa trong chiếc ghế bành bọc gấm viền những sợi kim tuyến vàng óng, nghiêng người về phía trước trông giống như một cậu học trò nhỏ đang tự hào kể về mối tình đầu đẹp đẽ của mình hơn là một nhà tư bản tài chính lừng lẫy thế giới bảy-mươi-hai-tuổi. Câu chuyện sẽ được diễn giải như thế nào, tôi cần phải phỏng vấn những ai, bao nhiêu người và sẽ viết gì đây? Warren nói rằng tất cả đều do tôi quyết định.",
        "public": true,
        "publish_date": "2020",
        "author": "Alice Schroeder",
        "amount": 1000,
        "number_of_page": 1303,
        "sold": 1,
        "rating": 5,
        "price": 577000,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/z/2/z2347757265330_74b3b3541a95b12454cbde947ccc635e.jpg",
        "slug": "hon-tuyet-lan-cuoc-doi-va-su-nghiep-cua-warren-buffett",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 14,
            "name": "TIỂU SỬ HỒI KÝ",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 265,
        "name": "Tự Truyện Benjamin Franklin (Tái Bản 2018)",
        "description": "Franklin (1706-1790) là một chính khách, nhà ngoại giao, nhà văn, nhà khoa học và sáng chế, một trong những người uyên bác và tài năng nhất nước Mỹ thuộc địa, và là một nhân vật quan trọng trong cuộc chiến đấu giành độc lập của người Mỹ.\r\n\r\nBenjamin Franklin được coi là một trong những nhà lập quốc vĩ đại của nước Mỹ. Ông là người duy nhất đã ký tên vào cả bốn văn kiện quan trọng trong lịch sử nước Mỹ : Bản Tuyên ngôn Độc lập, Hiệp ước đồng minh với Pháp, Hiệp ước Paris và Bản Hiến pháp Hoa Kỳ.\r\n\r\nÔng từng làm thợ nấu xà phòng, thợ in, nhà văn, khoa học gia kiêm nhà phát minh, lãnh đạo các tổ chức phục vụ cộng đồng. Bên cạnh đó ông cũng là một nhà ngoại giao có tài. Nhiều sử gia Hoa Kỳ công nhận ông là một nhà ngoại giao có năng lực và thành công nhất từ xưa tới nay.\r\n\r\nMột năm sau ngày Benjamin ông qua đời, cuốn tự truyện của ông được giới thiệu tới công chúng lần đầu tại Paris, tháng Ba năm 1791. Được biết tới với tên gọi The autobiography of Benjamin Franklin - Hồi ký Benjamin Franklin, tác phẩm được viết lại và hoàn thành bởi con trai của Franklin, người sau này là Thống đốc bang New Jersey.\r\n\r\nTác phẩm đã nhận được nhiều lời khen ngợi của các nhà phê bình cũng như được công nhận là một trong những tác phẩm kinh điển nhất trong lịch sử nước Mỹ. Cuốn sách đã khắc họa một cách rõ nét chân dung con người Benjamin Franklin cũng như cuộc đời đầy biến động của ông khi còn sống ở Philadenphia. Bên cạnh đó, độc giả cũng có cơ hội được tìm hiểu kỹ hơn những quan điểm của ông về Triết học, văn học cũng như tôn giáo và những yếu tố giúp Franklin trở thành một nhân vật vĩ đại có công kiến tạo nên nước Mỹ ngày nay.\r\n\r\n« Một trong những tác phẩm kinh điển nhất của nền văn học Mỹ, cuốn sách ghi lại gần như đầy đủ cuộc đời của Benjamin Franklin từ thời thiếu niên cho đến khi trở thành Chủ tịch Hội đồng Hành pháp Tối cao Pennsylvania. »\r\n\r\n- Amazon.com\r\n\r\n« Một tác phẩm bất hủ. Thông qua cuốn tự truyện đầy xúc động này… chúng ta như được gặp lại Franklin, được nghe ông kể lại lý do vì sao tình yêu và ảo mông của ông với đế chế Anh quốc lại đến hồi tan vỡ như vậy… »\r\n\r\n- Salt lake City Tribune\r\n\r\n« Cuốn tự truyện được Benjamin viết nên với sự kỷ luật của một người chỉ huy chứ không chỉ đơn thuần là một lời tự sự thông thường ».\r\n\r\n- George Fetherling, Vancouver Sun\r\n\r\nMã hàng\t8935270700621\r\nTên Nhà Cung Cấp\tAlpha Books\r\nTác giả\tBenjamin Franklin\r\nNgười Dịch\tNguyễn Thụy Khánh Chương\r\nNXB\tNXB Lao Động\r\nNăm XB\t2018\r\nTrọng lượng (gr)\t250\r\nKích Thước Bao Bì\t16 x 24\r\nSố trang\t238\r\nHình thức\tBìa Mềm\r\nSản phẩm hiển thị trong\t\r\nDONALD TRUMP VÀ NHỮNG CÂU CHUYỆN\r\nTủ Sách Chính Trị\r\nTuyển Tập Sách Omega\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Chính Trị bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nFranklin (1706-1790) là một chính khách, nhà ngoại giao, nhà văn, nhà khoa học và sáng chế, một trong những người uyên bác và tài năng nhất nước Mỹ thuộc địa, và là một nhân vật quan trọng trong cuộc chiến đấu giành độc lập của người Mỹ.\r\n\r\nBenjamin Franklin được coi là một trong những nhà lập quốc vĩ đại của nước Mỹ. Ông là người duy nhất đã ký tên vào cả bốn văn kiện quan trọng trong lịch sử nước Mỹ : Bản Tuyên ngôn Độc lập, Hiệp ước đồng minh với Pháp, Hiệp ước Paris và Bản Hiến pháp Hoa Kỳ.\r\n\r\nÔng từng làm thợ nấu xà phòng, thợ in, nhà văn, khoa học gia kiêm nhà phát minh, lãnh đạo các tổ chức phục vụ cộng đồng. Bên cạnh đó ông cũng là một nhà ngoại giao có tài. Nhiều sử gia Hoa Kỳ công nhận ông là một nhà ngoại giao có năng lực và thành công nhất từ xưa tới nay.\r\n\r\nMột năm sau ngày Benjamin ông qua đời, cuốn tự truyện của ông được giới thiệu tới công chúng lần đầu tại Paris, tháng Ba năm 1791. Được biết tới với tên gọi The autobiography of Benjamin Franklin - Hồi ký Benjamin Franklin, tác phẩm được viết lại và hoàn thành bởi con trai của Franklin, người sau này là Thống đốc bang New Jersey.\r\n\r\nTác phẩm đã nhận được nhiều lời khen ngợi của các nhà phê bình cũng như được công nhận là một trong những tác phẩm kinh điển nhất trong lịch sử nước Mỹ. Cuốn sách đã khắc họa một cách rõ nét chân dung con người Benjamin Franklin cũng như cuộc đời đầy biến động của ông khi còn sống ở Philadenphia. Bên cạnh đó, độc giả cũng có cơ hội được tìm hiểu kỹ hơn những quan điểm của ông về Triết học, văn học cũng như tôn giáo và những yếu tố giúp Franklin trở thành một nhân vật vĩ đại có công kiến tạo nên nước Mỹ ngày nay.\r\n\r\n« Một trong những tác phẩm kinh điển nhất của nền văn học Mỹ, cuốn sách ghi lại gần như đầy đủ cuộc đời của Benjamin Franklin từ thời thiếu niên cho đến khi trở thành Chủ tịch Hội đồng Hành pháp Tối cao Pennsylvania. »",
        "public": true,
        "publish_date": "2017",
        "author": "Benjamin Franklin",
        "amount": 640,
        "number_of_page": 238,
        "sold": 1,
        "rating": 5,
        "price": 70000,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/i/m/image_176921.jpg",
        "slug": "tu-truyen-benjamin-franklin-tai-ban-2018",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 14,
            "name": "TIỂU SỬ HỒI KÝ",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 266,
        "name": "Hồ Chí Minh Và Con Người Việt Nam Trên Con Đường Dân Giàu, Nước Mạnh",
        "description": "Hồ Chí Minh Và Con Người Việt Nam Trên Con Đường Dân Giàu, Nước Mạnh\r\n\r\nNội dung sách gồm 2 phần:\r\n\r\nPhần thứ nhất: Con người trong lịch sử loài người, con người Việt Nam trong lịch sử Việt Nam.\r\n\r\nPhần thứ hai: Hồ Chí Minh và con người Việt Nam trên con đường dân giàu, nước mạnh\r\n\r\nCuốn sách tái hiện một cách khái quát con người Việt Nam trong lịch sử và sự nghiệp cách mạng của dân tộc ta dưới sự dẫn dắt của Đảng và Chủ tịch Hồ Chí Minh",
        "public": true,
        "publish_date": "2022",
        "author": "Phạm Văn Đồng",
        "amount": 1111,
        "number_of_page": 164,
        "sold": 6,
        "rating": 5,
        "price": 62100,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/8/9/8935279149117.jpg",
        "slug": "ho-chi-minh-va-con-nguoi-viet-nam-tren-con-duong-dan-giau-nuoc-manh",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-10T03:47:46.700Z",
        "category": {
            "id": 14,
            "name": "TIỂU SỬ HỒI KÝ",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 267,
        "name": "Cái Chết Của Nền Dân Chủ: Những Bước Tiến Quyền Lực Của Hitler",
        "description": "Tại sao một nền dân chủ khai sáng như Cộng hòa Weimar lại mọc lên một chế độ tàn ác nhất trong lịch sử loài người? Tại sao một chính phủ dân chủ lại để một kẻ độc tài như Hitler nắm quyền? Có phải chủ nghĩa Quốc xã hình thành bởi vì quyền lực không được kiểm soát? Có phải chủ nghĩa Quốc xã là một vấn đề riêng biệt của nước Đức, hay là biểu hiện của một cuộc khủng hoảng rộng lớn hơn? Có phải sự trỗi dậy của Hitler là tất yếu hay nó chỉ là ngẫu nhiên? Tất cả sẽ được Benjamin Carter Hett giải đáp phần nào trong tựa sách: CÁI CHẾT CỦA NỀN DÂN CHỦ.\r\n\r\nCái Chết Của Nền Dân Chủ - Những Bước Tiến Quyền Lực Của Hitler (tựa gốc: The Death of Democracy: Hitler’s Rise to Power and The Downfall of The Weimar Republic) là tác phẩm biên khảo lịch sử của Benjamin Carter Hett, được xuất bản lần đầu năm 2018 và đã được dịch ra nhiều thứ tiếng.\r\n\r\nCộng hòa Weimar (Weimar Republic) là tên gọi không chính thức của nước Đức từ 1918 đến 1933, khi một nền dân chủ cộng hòa được thiết lập, nối giữa Đế chế Đức theo chế độ quân chủ lập hiến trước năm 1918 và Đế chế Đức theo chế độ độc tài Quốc xã từ năm 1933 (Đế chế thứ Ba, Đệ tam Đế chế). Tên gọi Cộng hòa Weimar được đặt theo tên của thị trấn Weimar, nơi Quốc hội lập hiến của Đức làm việc và soạn thảo bản hiến pháp Cộng hòa đầu tiên, gọi là Hiến pháp Weimar.\r\n\r\n------\r\n\r\n“Uyên bác, giàu thông tin...hấp dẫn. Hett cho chúng ta thấy bài học về sự mong manh của nền dân chủ và sự nguy hiểm của niềm tin tự mãn rằng các thể chế tự do sẽ luôn bảo vệ chúng ta.” – The Times.\r\n\r\n“Benjamin Carter Hett là một trong số ít các nhà sử học có khả năng suy nghĩ thấu đáo và biết cách kể một câu chuyện hay - mà không cần đơn giản hóa nó. Cuốn sách của ông đã giải quyết một trong những câu hỏi thú vị nhất lịch sử nước Đức: Làm thế nào mà một quốc gia có học thức và phát triển như Đức lại có thể rơi vào tay Adolf Hitler?” – Stefan Aust.\r\n\r\n“[Một] nghiên cứu cực kỳ xuất sắc về sự kết thúc của chế độ lập hiến ở Đức... Được viết cẩn thận cùng nền tảng kiến thức tốt, với các bản vẽ thu nhỏ chỉn chu về các cá nhân và các cuộc thảo luận ngắn gọn về thể chế và kinh tế... [Benjamin Carter Hett] đã mô tả một cách nhạy cảm về một cuộc khủng hoảng đạo đức trước một thảm họa đạo đức” – Timothy Snyder, The New York Times Book Review.\r\n\r\nThông tin tác giả\r\n\r\nBenjamin Carter Hett là sử gia người Canada, hiện sống tại Mỹ. Ông còn là Tiến sĩ Luật tại Đại học Luật Toronto và Tiến sĩ Sử học tại Đại học Harvard. Từ năm 2003, Benjamin Carter Hett trở thành giảng viên ngành lịch sử tại Đại học Hunter và Graduate Center, City University of New York.\r\n\r\nÔng nghiên cứu sâu về lịch sử Đức Quốc xã và có các tác phẩm như: Death in the Tiergarten (2004), Crossing Hitler (2008), Burning the Reichstag (2013) đã gây tiếng vang lớn bởi phương pháp nghiên cứu hiện đại, sự uyên bác và tính hấp dẫn, được ghi nhận bằng giải thưởng Fraenkel Prize.\r\n\r\nThe Death of Democracy (Cái chết của nền dân chủ) là tác phẩm được dịch nhiều thứ tiếng và được giới nghiên cứu lịch sử đánh giá cao.\r\n\r\nMã hàng\t8936144201527\r\nTên Nhà Cung Cấp\tPhanbook\r\nTác giả\tBenjamin Carter Hett\r\nNgười Dịch\tHuỳnh Hoa\r\nNXB\tLao Động\r\nNăm XB\t2022\r\nTrọng lượng (gr)\t499\r\nKích Thước Bao Bì\t23.5 x 15.5 x 1.7 cm\r\nSố trang\t362\r\nHình thức\tBìa Mềm\r\nSản phẩm hiển thị trong\t\r\nPhanbook\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Chính Trị bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nTại sao một nền dân chủ khai sáng như Cộng hòa Weimar lại mọc lên một chế độ tàn ác nhất trong lịch sử loài người? Tại sao một chính phủ dân chủ lại để một kẻ độc tài như Hitler nắm quyền? Có phải chủ nghĩa Quốc xã hình thành bởi vì quyền lực không được kiểm soát? Có phải chủ nghĩa Quốc xã là một vấn đề riêng biệt của nước Đức, hay là biểu hiện của một cuộc khủng hoảng rộng lớn hơn? Có phải sự trỗi dậy của Hitler là tất yếu hay nó chỉ là ngẫu nhiên? Tất cả sẽ được Benjamin Carter Hett giải đáp phần nào trong tựa sách: CÁI CHẾT CỦA NỀN DÂN CHỦ.\r\n\r\nCái Chết Của Nền Dân Chủ - Những Bước Tiến Quyền Lực Của Hitler (tựa gốc: The Death of Democracy: Hitler’s Rise to Power and The Downfall of The Weimar Republic) là tác phẩm biên khảo lịch sử của Benjamin Carter Hett, được xuất bản lần đầu năm 2018 và đã được dịch ra nhiều thứ tiếng.\r\n\r\nCộng hòa Weimar (Weimar Republic) là tên gọi không chính thức của nước Đức từ 1918 đến 1933, khi một nền dân chủ cộng hòa được thiết lập, nối giữa Đế chế Đức theo chế độ quân chủ lập hiến trước năm 1918 và Đế chế Đức theo chế độ độc tài Quốc xã từ năm 1933 (Đế chế thứ Ba, Đệ tam Đế chế). Tên gọi Cộng hòa Weimar được đặt theo tên của thị trấn Weimar, nơi Quốc hội lập hiến của Đức làm việc và soạn thảo bản hiến pháp Cộng hòa đầu tiên, gọi là Hiến pháp Weimar.\r\n\r\n------\r\n\r\n“Uyên bác, giàu thông tin...hấp dẫn. Hett cho chúng ta thấy bài học về sự mong manh của nền dân chủ và sự nguy hiểm của niềm tin tự mãn rằng các thể chế tự do sẽ luôn bảo vệ chúng ta.” – The Times.\r\n\r\n“Benjamin Carter Hett là một trong số ít các nhà sử học có khả năng suy nghĩ thấu đáo và biết cách kể một câu chuyện hay - mà không cần đơn giản hóa nó. Cuốn sách của ông đã giải quyết một trong những câu hỏi thú vị nhất lịch sử nước Đức: Làm thế nào mà một quốc gia có học thức và phát triển như Đức lại có thể rơi vào tay Adolf Hitler?” – Stefan Aust.\r\n\r\n“[Một] nghiên cứu cực kỳ xuất sắc về sự kết thúc của chế độ lập hiến ở Đức... Được viết cẩn thận cùng nền tảng kiến thức tốt, với các bản vẽ thu nhỏ chỉn chu về các cá nhân và các cuộc thảo luận ngắn gọn về thể chế và kinh tế... [Benjamin Carter Hett] đã mô tả một cách nhạy cảm về một cuộc khủng hoảng đạo đức trước một thảm họa đạo đức” – Timothy Snyder, The New York Times Book Review.\r\n\r\nThông tin tác giả\r\n\r\nBenjamin Carter Hett là sử gia người Canada, hiện sống tại Mỹ. Ông còn là Tiến sĩ Luật tại Đại học Luật Toronto và Tiến sĩ Sử học tại Đại học Harvard. Từ năm 2003, Benjamin Carter Hett trở thành giảng viên ngành lịch sử tại Đại học Hunter và Graduate Center, City University of New York.\r\n\r\nÔng nghiên cứu sâu về lịch sử Đức Quốc xã và có các tác phẩm như: Death in the Tiergarten (2004), Crossing Hitler (2008), Burning the Reichstag (2013) đã gây tiếng vang lớn bởi phương pháp nghiên cứu hiện đại, sự uyên bác và tính hấp dẫn, được ghi nhận bằng giải thưởng Fraenkel Prize.\r\n\r\nThe Death of Democracy (Cái chết của nền dân chủ) là tác phẩm được dịch nhiều thứ tiếng và được giới nghiên cứu lịch sử đánh giá cao.\r\n\r\n",
        "public": true,
        "publish_date": "2021",
        "author": "Benjamin Carter Hett",
        "amount": 2423,
        "number_of_page": 362,
        "sold": 1,
        "rating": 5,
        "price": 236300,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/8/9/8936144201527.jpg",
        "slug": "cai-chet-cua-nen-dan-chu-nhung-buoc-tien-quyen-luc-cua-hitler",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 14,
            "name": "TIỂU SỬ HỒI KÝ",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 268,
        "name": "Cây Cam Ngọt Của Tôi",
        "description": "“Vị chua chát của cái nghèo hòa trộn với vị ngọt ngào khi khám phá ra những điều khiến cuộc đời này đáng sống... một tác phẩm kinh điển của Brazil.” - Booklist\r\n\r\n“Một cách nhìn cuộc sống gần như hoàn chỉnh từ con mắt trẻ thơ… có sức mạnh sưởi ấm và làm tan nát cõi lòng, dù người đọc ở lứa tuổi nào.” - The National\r\n\r\nHãy làm quen với Zezé, cậu bé tinh nghịch siêu hạng đồng thời cũng đáng yêu bậc nhất, với ước mơ lớn lên trở thành nhà thơ cổ thắt nơ bướm. Chẳng phải ai cũng công nhận khoản “đáng yêu” kia đâu nhé. Bởi vì, ở cái xóm ngoại ô nghèo ấy, nỗi khắc khổ bủa vây đã che mờ mắt người ta trước trái tim thiện lương cùng trí tưởng tượng tuyệt vời của cậu bé con năm tuổi.\r\n\r\nCó hề gì đâu bao nhiêu là hắt hủi, đánh mắng, vì Zezé đã có một người bạn đặc biệt để trút nỗi lòng: cây cam ngọt nơi vườn sau. Và cả một người bạn nữa, bằng xương bằng thịt, một ngày kia xuất hiện, cho cậu bé nhạy cảm khôn sớm biết thế nào là trìu mến, thế nào là nỗi đau, và mãi mãi thay đổi cuộc đời cậu.\r\n\r\nMở đầu bằng những thanh âm trong sáng và kết thúc lắng lại trong những nốt trầm hoài niệm, Cây cam ngọt của tôi khiến ta nhận ra vẻ đẹp thực sự của cuộc sống đến từ những điều giản dị như bông hoa trắng của cái cây sau nhà, và rằng cuộc đời thật khốn khổ nếu thiếu đi lòng yêu thương và niềm trắc ẩn. Cuốn sách kinh điển này bởi thế không ngừng khiến trái tim người đọc khắp thế giới thổn thức, kể từ khi ra mắt lần đầu năm 1968 tại Brazil.\r\n\r\nTÁC GIẢ:\r\n\r\nJOSÉ MAURO DE VASCONCELOS (1920-1984) là nhà văn người Brazil. Sinh ra trong một gia đình nghèo ở ngoại ô Rio de Janeiro, lớn lên ông phải làm đủ nghề để kiếm sống. Nhưng với tài kể chuyện thiên bẩm, trí nhớ phi thường, trí tưởng tượng tuyệt vời cùng vốn sống phong phú, José cảm thấy trong mình thôi thúc phải trở thành nhà văn nên đã bắt đầu sáng tác năm 22 tuổi. Tác phẩm nổi tiếng nhất của ông là tiểu thuyết mang màu sắc tự truyện Cây cam ngọt của tôi. Cuốn sách được đưa vào chương trình tiểu học của Brazil, được bán bản quyền cho hai mươi quốc gia và chuyển thể thành phim điện ảnh. Ngoài ra, José còn rất thành công trong vai trò diễn viên điện ảnh và biên kịch.\r\n\r\nMã hàng\t8935235228351\r\nTên Nhà Cung Cấp\tNhã Nam\r\nTác giả\tJosé Mauro de Vasconcelos\r\nNgười Dịch\tNguyễn Bích Lan, Tô Yến Ly\r\nNXB\tNXB Hội Nhà Văn\r\nNăm XB\t2020\r\nTrọng lượng (gr)\t280\r\nKích Thước Bao Bì\t20 x 14.5 cm\r\nSố trang\t244\r\nHình thức\tBìa Mềm\r\nSản phẩm hiển thị trong\t\r\nĐồ Chơi Cho Bé - Giá Cực Tốt\r\nNhã Nam\r\nRƯỚC DEAL LINH ĐÌNH VUI ĐÓN TRUNG THU\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Tiểu thuyết bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\n“Vị chua chát của cái nghèo hòa trộn với vị ngọt ngào khi khám phá ra những điều khiến cuộc đời này đáng sống... một tác phẩm kinh điển của Brazil.” - Booklist\r\n\r\n“Một cách nhìn cuộc sống gần như hoàn chỉnh từ con mắt trẻ thơ… có sức mạnh sưởi ấm và làm tan nát cõi lòng, dù người đọc ở lứa tuổi nào.” - The National\r\n\r\nHãy làm quen với Zezé, cậu bé tinh nghịch siêu hạng đồng thời cũng đáng yêu bậc nhất, với ước mơ lớn lên trở thành nhà thơ cổ thắt nơ bướm. Chẳng phải ai cũng công nhận khoản “đáng yêu” kia đâu nhé. Bởi vì, ở cái xóm ngoại ô nghèo ấy, nỗi khắc khổ bủa vây đã che mờ mắt người ta trước trái tim thiện lương cùng trí tưởng tượng tuyệt vời của cậu bé con năm tuổi.\r\n\r\nCó hề gì đâu bao nhiêu là hắt hủi, đánh mắng, vì Zezé đã có một người bạn đặc biệt để trút nỗi lòng: cây cam ngọt nơi vườn sau. Và cả một người bạn nữa, bằng xương bằng thịt, một ngày kia xuất hiện, cho cậu bé nhạy cảm khôn sớm biết thế nào là trìu mến, thế nào là nỗi đau, và mãi mãi thay đổi cuộc đời cậu.\r\n\r\nMở đầu bằng những thanh âm trong sáng và kết thúc lắng lại trong những nốt trầm hoài niệm, Cây cam ngọt của tôi khiến ta nhận ra vẻ đẹp thực sự của cuộc sống đến từ những điều giản dị như bông hoa trắng của cái cây sau nhà, và rằng cuộc đời thật khốn khổ nếu thiếu đi lòng yêu thương và niềm trắc ẩn. Cuốn sách kinh điển này bởi thế không ngừng khiến trái tim người đọc khắp thế giới thổn thức, kể từ khi ra mắt lần đầu năm 1968 tại Brazil.\r\n\r\nTÁC GIẢ:\r\n\r\nJOSÉ MAURO DE VASCONCELOS (1920-1984) là nhà văn người Brazil. Sinh ra trong một gia đình nghèo ở ngoại ô Rio de Janeiro, lớn lên ông phải làm đủ nghề để kiếm sống. Nhưng với tài kể chuyện thiên bẩm, trí nhớ phi thường, trí tưởng tượng tuyệt vời cùng vốn sống phong phú, José cảm thấy trong mình thôi thúc phải trở thành nhà văn nên đã bắt đầu sáng tác năm 22 tuổi. Tác phẩm nổi tiếng nhất của ông là tiểu thuyết mang màu sắc tự truyện Cây cam ngọt của tôi. Cuốn sách được đưa vào chương trình tiểu học của Brazil, được bán bản quyền cho hai mươi quốc gia và chuyển thể thành phim điện ảnh. Ngoài ra, José còn rất thành công trong vai trò diễn viên điện ảnh và biên kịch.",
        "public": true,
        "publish_date": "2020",
        "author": "José Mauro de Vasconcelos",
        "amount": 4533,
        "number_of_page": 400,
        "sold": 1,
        "rating": 5,
        "price": 75000,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/flashmagazine/images/page_images/cay_cam_ngot_cua_toi/2020_12_17_16_50_30_1-390x510.jpg",
        "slug": "cay-cam-ngot-cua-toi",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 9,
            "name": "TIỂU THUYẾT",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-09T13:55:04.228Z"
        },
        "images": []
    },
    {
        "id": 269,
        "name": "Nhà Giả Kim (Tái Bản 2020)",
        "description": "Tất cả những trải nghiệm trong chuyến phiêu du theo đuổi vận mệnh của mình đã giúp Santiago thấu hiểu được ý nghĩa sâu xa nhất của hạnh phúc, hòa hợp với vũ trụ và con người. \r\n\r\nTiểu thuyết Nhà giả kim của Paulo Coelho như một câu chuyện cổ tích giản dị, nhân ái, giàu chất thơ, thấm đẫm những minh triết huyền bí của phương Đông. Trong lần xuất bản đầu tiên tại Brazil vào năm 1988, sách chỉ bán được 900 bản. Nhưng, với số phận đặc biệt của cuốn sách dành cho toàn nhân loại, vượt ra ngoài biên giới quốc gia, Nhà giả kim đã làm rung động hàng triệu tâm hồn, trở thành một trong những cuốn sách bán chạy nhất mọi thời đại, và có thể làm thay đổi cuộc đời người đọc.\r\n\r\n“Nhưng nhà luyện kim đan không quan tâm mấy đến những điều ấy. Ông đã từng thấy nhiều người đến rồi đi, trong khi ốc đảo và sa mạc vẫn là ốc đảo và sa mạc. Ông đã thấy vua chúa và kẻ ăn xin đi qua biển cát này, cái biển cát thường xuyên thay hình đổi dạng vì gió thổi nhưng vẫn mãi mãi là biển cát mà ông đã biết từ thuở nhỏ. Tuy vậy, tự đáy lòng mình, ông không thể không cảm thấy vui trước hạnh phúc của mỗi người lữ khách, sau bao ngày chỉ có cát vàng với trời xanh nay được thấy chà là xanh tươi hiện ra trước mắt. ‘Có thể Thượng đế tạo ra sa mạc chỉ để cho con người biết quý trọng cây chà là,’ ông nghĩ.”\r\n\r\n- Trích Nhà giả kim\r\n\r\nNhận định\r\n\r\n“Sau Garcia Márquez, đây là nhà văn Mỹ Latinh được đọc nhiều nhất thế giới.” - The Economist, London, Anh\r\n\r\n \r\n\r\n“Santiago có khả năng cảm nhận bằng trái tim như Hoàng tử bé của Saint-Exupéry.” - Frankfurter Allgemeine Zeitung, Đức\r\n\r\nMã hàng\t8935235226272\r\nTên Nhà Cung Cấp\tNhã Nam\r\nTác giả\tPaulo Coelho\r\nNgười Dịch\tLê Chu Cầu\r\nNXB\tNXB Hội Nhà Văn\r\nNăm XB\t2020\r\nTrọng lượng (gr)\t220\r\nKích Thước Bao Bì\t20.5 x 13 cm\r\nSố trang\t227\r\nHình thức\tBìa Mềm\r\nSản phẩm hiển thị trong\t\r\nĐồ Chơi Cho Bé - Giá Cực Tốt\r\nNhã Nam\r\nTop sách được phiên dịch nhiều nhất\r\nRƯỚC DEAL LINH ĐÌNH VUI ĐÓN TRUNG THU\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Tiểu thuyết bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nTất cả những trải nghiệm trong chuyến phiêu du theo đuổi vận mệnh của mình đã giúp Santiago thấu hiểu được ý nghĩa sâu xa nhất của hạnh phúc, hòa hợp với vũ trụ và con người. \r\n\r\nTiểu thuyết Nhà giả kim của Paulo Coelho như một câu chuyện cổ tích giản dị, nhân ái, giàu chất thơ, thấm đẫm những minh triết huyền bí của phương Đông. Trong lần xuất bản đầu tiên tại Brazil vào năm 1988, sách chỉ bán được 900 bản. Nhưng, với số phận đặc biệt của cuốn sách dành cho toàn nhân loại, vượt ra ngoài biên giới quốc gia, Nhà giả kim đã làm rung động hàng triệu tâm hồn, trở thành một trong những cuốn sách bán chạy nhất mọi thời đại, và có thể làm thay đổi cuộc đời người đọc.\r\n\r\n“Nhưng nhà luyện kim đan không quan tâm mấy đến những điều ấy. Ông đã từng thấy nhiều người đến rồi đi, trong khi ốc đảo và sa mạc vẫn là ốc đảo và sa mạc. Ông đã thấy vua chúa và kẻ ăn xin đi qua biển cát này, cái biển cát thường xuyên thay hình đổi dạng vì gió thổi nhưng vẫn mãi mãi là biển cát mà ông đã biết từ thuở nhỏ. Tuy vậy, tự đáy lòng mình, ông không thể không cảm thấy vui trước hạnh phúc của mỗi người lữ khách, sau bao ngày chỉ có cát vàng với trời xanh nay được thấy chà là xanh tươi hiện ra trước mắt. ‘Có thể Thượng đế tạo ra sa mạc chỉ để cho con người biết quý trọng cây chà là,’ ông nghĩ.”\r\n\r\n- Trích Nhà giả kim",
        "public": true,
        "publish_date": "2020",
        "author": "Paulo Coelho",
        "amount": 123,
        "number_of_page": 227,
        "sold": 5,
        "rating": 5,
        "price": 55300,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_36793.jpg",
        "slug": "nha-gia-kim-tai-ban-2020",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-10T03:47:46.699Z",
        "category": {
            "id": 9,
            "name": "TIỂU THUYẾT",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-09T13:55:04.228Z"
        },
        "images": []
    },
    {
        "id": 270,
        "name": "Thằng Huyện - Con Hầu",
        "description": "Thằng Huyện - Con Hầu\r\n\r\nThời cuộc nhiễu nhương, trăm đường yêu nước. Có kẻ hộ gia bằng giáo, có người vệ quốc bằng đao, có bậc anh hào thà thác vinh còn hơn sống nhục. Thế nhưng cũng có những kẻ thà rước vào oan nhục ngàn đời cũng không buông tay bỏ rơi cái gốc.\r\n\r\nCâu chuyện lấy bối cảnh ở làng Ẻn xứ Thanh Ba, nơi phép vua còn thua lệ làng. Trong cái làng nhỏ đó có một ông Huyện với một nàng hầu, danh tiếng xấu xa chẳng ai bằng, kẻ bán nước cầu vinh, kẻ bán thân xin tội. Thế nhưng câu chuyện qua miệng đời, thực hư thế nào có mấy ai tỏ tường.\r\n\r\nLà một tác giả 8x, VanVo55 vẫn giữ được tâm hồn trẻ trung, yêu đời, mang niềm đam mê mãnh liệt với những câu chuyện tình cảm tha thiết và điều đó được thể hiện rõ nét nhất ngay trong tiểu thuyết Thằng Huyện con hầu.\r\n\r\nMã hàng\t8936107812968\r\nTên Nhà Cung Cấp\tCÔNG TY TNHH SÁCH & TRUYỀN THÔNG VIỆT NAM\r\nTác giả\tVanVo55\r\nNXB\tNXB Hội Nhà Văn\r\nNăm XB\t2022\r\nTrọng lượng (gr)\t200\r\nKích Thước Bao Bì\t20.5 x 14.5 x 0.5 cm\r\nSố trang\t196\r\nHình thức\tBìa Mềm\r\nSản phẩm hiển thị trong\t\r\nCÔNG TY TNHH SÁCH & TRUYỀN THÔNG VIỆT NAM\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Tiểu thuyết bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nThằng Huyện - Con Hầu\r\n\r\nThời cuộc nhiễu nhương, trăm đường yêu nước. Có kẻ hộ gia bằng giáo, có người vệ quốc bằng đao, có bậc anh hào thà thác vinh còn hơn sống nhục. Thế nhưng cũng có những kẻ thà rước vào oan nhục ngàn đời cũng không buông tay bỏ rơi cái gốc.\r\n\r\nCâu chuyện lấy bối cảnh ở làng Ẻn xứ Thanh Ba, nơi phép vua còn thua lệ làng. Trong cái làng nhỏ đó có một ông Huyện với một nàng hầu, danh tiếng xấu xa chẳng ai bằng, kẻ bán nước cầu vinh, kẻ bán thân xin tội. Thế nhưng câu chuyện qua miệng đời, thực hư thế nào có mấy ai tỏ tường.\r\n\r\nLà một tác giả 8x, VanVo55 vẫn giữ được tâm hồn trẻ trung, yêu đời, mang niềm đam mê mãnh liệt với những câu chuyện tình cảm tha thiết và điều đó được thể hiện rõ nét nhất ngay trong tiểu thuyết Thằng Huyện con hầu.",
        "public": true,
        "publish_date": "2021",
        "author": "VanVo55",
        "amount": 196,
        "number_of_page": 196,
        "sold": 1,
        "rating": 5,
        "price": 75000,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/8/9/8936107812968.jpg",
        "slug": "thang-huyen-con-hau",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 9,
            "name": "TIỂU THUYẾT",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-09T13:55:04.228Z"
        },
        "images": []
    },
    {
        "id": 271,
        "name": "Khắc Cốt Ghi Tâm",
        "description": "Khắc Cốt Ghi Tâm\r\n\r\nJacqueline Woodson mở đầu cuốn tiểu thuyết mới đầy sức mạnh của bà bằng một từ “nhưng” táo bạo. Tuy nhiên, không có bất cứ chữ nhưng nào khi nói về tài năng của nhà văn này.\r\n\r\nKhắc cốt ghi tâm tiếp nối cuốn hồi ký đoạt giải Sách Quốc gia Mỹ của Woodson, Brown Girl Dreaming, và cuốn tiểu thuyết được giới phê bình văn học đánh giá cao là Another Brooklyn, cùng hơn hai mươi tiểu thuyết dành cho người trẻ khác, một vài trong số đó đã được nhận Giải thưởng Newbery. Với cuốn tiểu thuyết mới mẻ dành cho người lớn này, Woodson tiếp tục cho thấy những khám phá xúc động của bà về việc là một cô gái da màu ở Mỹ nghĩa là như thế nào.\r\n\r\nKhắc cốt ghi tâm là câu chuyện đầy tinh tế về hai gia đình người da màu thành thị – một bên là cặp vợ chồng giàu có, hết lòng tận tuỵ vì nhau; một bên chỉ có bà mẹ đơn thân chật vật với cuộc sống mưu sinh qua ngày – cuộc đời của họ đã vĩnh viễn gắn kết với nhau khi những đứa con duy nhất của họ mang thai ở tuổi vị thành niên. Dành cho những phụ nữ trẻ đã lớn lên cùng tiểu thuyết cho thanh thiếu niên của Woodson, cuốn tiểu thuyết cô đọng này tập trung vào các quyết định mà ta sẽ đưa ra trong cuộc đời, thường là do bị thúc ép, hoặc trước khi ta có thể hiểu được thấu đáo những hậu quả chúng để lại phía sau.\r\n\r\nVăn phong của “Khắc cốt ghi tâm đọc lên như thơ như kịch, như tiếng nghẹn ngào từ trái tim của nỗi đau cứa tận xương tuỷ. Câu truyện liên tục thay đổi điểm nhìn về không gian và thời gian qua lời kể chuyện của năm nhân vật trải dài qua ba thế hệ – đứa trẻ được sinh ra ngoài ý muốn, kết quả của mối tình thời trung học, cha mẹ và ông bà của cô bé – rồi dần dần tiến lên tới cao trào của câu truyện. Chỉ trong chưa đầy 200 trang, cuốn sách chứa đựng mọi vấn đề về tầng lớp, giáo dục, tham vọng, thành kiến chủng tộc, khát vọng và khuynh hướng tình dục, bản ngã, tình mẫu tử, phụ tử và mất mát – chưa bao giờ có cuốn sách nào trông như một danh mục về Những điều Quan trọng như thế.\r\n\r\nMã hàng\t8935325002410\r\nTên Nhà Cung Cấp\tAZ Việt Nam\r\nTác giả\tJacqueline Woodson\r\nNgười Dịch\tThúy\r\nNXB\tNXB Thế Giới\r\nNăm XB\t2021\r\nNgôn Ngữ\tTiếng Việt\r\nTrọng lượng (gr)\t200\r\nKích Thước Bao Bì\t20.5 x 14 x 0.8 cm\r\nSố trang\t160\r\nHình thức\tBìa Mềm\r\nSản phẩm hiển thị trong\t\r\nAZ Việt Nam\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Tiểu thuyết bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nKhắc Cốt Ghi Tâm\r\n\r\nJacqueline Woodson mở đầu cuốn tiểu thuyết mới đầy sức mạnh của bà bằng một từ “nhưng” táo bạo. Tuy nhiên, không có bất cứ chữ nhưng nào khi nói về tài năng của nhà văn này.\r\n\r\nKhắc cốt ghi tâm tiếp nối cuốn hồi ký đoạt giải Sách Quốc gia Mỹ của Woodson, Brown Girl Dreaming, và cuốn tiểu thuyết được giới phê bình văn học đánh giá cao là Another Brooklyn, cùng hơn hai mươi tiểu thuyết dành cho người trẻ khác, một vài trong số đó đã được nhận Giải thưởng Newbery. Với cuốn tiểu thuyết mới mẻ dành cho người lớn này, Woodson tiếp tục cho thấy những khám phá xúc động của bà về việc là một cô gái da màu ở Mỹ nghĩa là như thế nào.\r\n\r\nKhắc cốt ghi tâm là câu chuyện đầy tinh tế về hai gia đình người da màu thành thị – một bên là cặp vợ chồng giàu có, hết lòng tận tuỵ vì nhau; một bên chỉ có bà mẹ đơn thân chật vật với cuộc sống mưu sinh qua ngày – cuộc đời của họ đã vĩnh viễn gắn kết với nhau khi những đứa con duy nhất của họ mang thai ở tuổi vị thành niên. Dành cho những phụ nữ trẻ đã lớn lên cùng tiểu thuyết cho thanh thiếu niên của Woodson, cuốn tiểu thuyết cô đọng này tập trung vào các quyết định mà ta sẽ đưa ra trong cuộc đời, thường là do bị thúc ép, hoặc trước khi ta có thể hiểu được thấu đáo những hậu quả chúng để lại phía sau.\r\n\r\nVăn phong của “Khắc cốt ghi tâm đọc lên như thơ như kịch, như tiếng nghẹn ngào từ trái tim của nỗi đau cứa tận xương tuỷ. Câu truyện liên tục thay đổi điểm nhìn về không gian và thời gian qua lời kể chuyện của năm nhân vật trải dài qua ba thế hệ – đứa trẻ được sinh ra ngoài ý muốn, kết quả của mối tình thời trung học, cha mẹ và ông bà của cô bé – rồi dần dần tiến lên tới cao trào của câu truyện. Chỉ trong chưa đầy 200 trang, cuốn sách chứa đựng mọi vấn đề về tầng lớp, giáo dục, tham vọng, thành kiến chủng tộc, khát vọng và khuynh hướng tình dục, bản ngã, tình mẫu tử, phụ tử và mất mát – chưa bao giờ có cuốn sách nào trông như một danh mục về Những điều Quan trọng như thế.",
        "public": true,
        "publish_date": "2021",
        "author": "Jacqueline Woodson",
        "amount": 770,
        "number_of_page": 160,
        "sold": 1,
        "rating": 5,
        "price": 46640,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/8/9/8935325002410.jpg",
        "slug": "khac-cot-ghi-tam",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 9,
            "name": "TIỂU THUYẾT",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-09T13:55:04.228Z"
        },
        "images": []
    },
    {
        "id": 272,
        "name": "Đứa Con Gái Hoang Đàng - The Prodigal Daughter",
        "description": "\"Tiếp nối cuốn tiểu thuyết nổi tiếng HAI SỐ PHẬN về William Kane và Abel Rosnovski, Đứa con gái hoang đàng là một câu chuyện được chắp bút của thế hệ tiếp theo. Câu chuyện đầy trớ trêu, trắc trở nhưng đầy nhân văn.\r\n\r\nTƯƠNG LAI CỦA CÔ LÀ THAM VỌNG\r\n\r\nFlorentyna Rosnovski – con gái Abel – với một ý chí sắt đá di truyền từ người cha, cô quyết tâm theo đuổi mục tiêu và lý tưởng của mình, đó là trở thành nữ Tổng thống Mỹ đầu tiên. Tuy thế, cuộc đời của cô, cũng giống như người cha của mình, cũng gặp vô cùng nhiều trắc trở mà người phụ nữ tham vọng này nhất định phải vượt qua.\r\n\r\nVới hình tượng được lấy cảm hứng từ những nhân cách lớn như “bà đầm thép” Margaret Thatcher, Golda Meer, hay Indira Gandhi, Jeffrey Archer đã trả lời cho độc giả những câu hỏi về cuộc đời và số phận, về ý nghĩa của cuộc sống này. Vượt qua cơn giông tố, vươn đến những vì sao chính là thông điệp mà cây bút tài ba muốn truyền tải.\"\r\n\r\nÝ NGHĨA NHAN ĐỀ\r\n\r\nTiểu thuyết Đứa con gái hoang đàng được dịch từ tên gốc The Prodigal Daughter. Cái tên này được Jeffrey Archer đặt theo một Dụ ngôn trong Kinh Thánh – The Prodigal Son. Ở Việt Nam, tích này được biết đến với cái tên Người con hoang đàng, hay Đứa con hoang đàng trở về. Cách đặt tên này tạo ra một sự kết nối chặt chẽ vói phần 1 – Hai số phận. Tiểu thuyết Hai số phận với tên gốc là Kane and Abel – vốn dĩ cũng là một biến thể của Cain and Abel – một Dụ ngôn khác trong Kinh Thánh.\r\n\r\nSỨC HẤP DẪN CỦA CUỐN SÁCH ĐỐI VỚI ĐỘC GIẢ\r\n\r\n“Một trong mười nhà văn có tài kể chuyện hay nhất thế giới.” – Los Angeles Times\r\n\r\n“Mạch truyện nhanh và lôi cuốn.” – Library Journal\r\n\r\n“Một bậc thầy trong việc pha trộn các yếu tố quyền lực, chính trị và danh vọng vào trong một cuốn tiểu thuyết.” – Entertainment Weekly\r\n\r\n“Một người kể chuyện ở đẳng cấp của Alexander Dumas, với kỹ năng vượt trội, Archer khiến độc giả không ngừng tự hỏi điều gì đang đón đợi phía trước.” – Washington Post\r\n\r\nTHÔNG TIN TÁC GIẢ\r\n\r\nJeffrey Archer (sinh ngày 15/4/1940) là một tiểu thuyết gia người Anh, cựu chính trị gia và là người tiên phong trong làng tiểu thuyết Anh Quốc.\r\n\r\nTrong suốt sự nghiệp sáng tác của mình, ông ghi dấu ấn với rất nhiều tiểu thuyết nổi tiếng, có thể kể đến : Hai số phận, Đứa con gái hoang đàng và các cuốn cùng series Biên niên Clifton: Chỉ thời gian có thể cất lời, Tội lỗi của người cha, Bí mật sâu kín nhất…\r\n\r\nÔng được mệnh danh là một trong những nhà văn có tài kể chuyện hay nhất.\r\n\r\nTHÔNG TIN VỀ SERIES “KANE VÀ ABEL”\r\n\r\nSeries về Kane và Abel của Jeffrey Archer xoay quanh những nhân vật của gia đình Rosnovski và Kane. Phần một với nhan đề Kane and Abel được xuất bản với tên tiếng Việt Hai số phận đã và đang là một cuốn sách bán chạy bậc nhất tại Việt Nam. Cuốn sách nói về William Kane và Abel Rosnovski – hai người anh em nhưng lại sinh ra ở hai hoàn cảnh trái ngược; cuốn sách là một câu chuyện cảm động về hành trình đi lên và vượt qua những thử thách. Đứa con gái hoang đàng (The Prodigal Daughter) tiếp nối câu chuyện giữa hai gia đình, có thể nói đây là phần hậu truyện của Hai số phận, cuốn sách nói về cuộc đời và số phận của thế hệ thứ hai, cụ thể hơn là Florentyna Rosnovski – con gái của Abel, khi gia đình Rosnovski đã định cư tại Mỹ.\r\n\r\nVà cuối cùng là phần 3 – Shall we tell the President, tiếp nối câu chuyện dang dở của Đứa con gái hoàng đàng.\r\n\r\nMã hàng\t9786043209679\r\nTên Nhà Cung Cấp\tBách Việt\r\nTác giả\tJeffrey Archer\r\nNXB\tNXB Lao Động\r\nNăm XB\t2021\r\nTrọng lượng (gr)\t900\r\nKích Thước Bao Bì\t20.5 x 13.5 cm\r\nSố trang\t836\r\nHình thức\tBìa Mềm\r\nSản phẩm hiển thị trong\t\r\nBách Việt\r\nFlashsale\r\nMã Giảm Giá\r\nRƯỚC DEAL LINH ĐÌNH VUI ĐÓN TRUNG THU\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Tiểu thuyết bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\n\"Tiếp nối cuốn tiểu thuyết nổi tiếng HAI SỐ PHẬN về William Kane và Abel Rosnovski, Đứa con gái hoang đàng là một câu chuyện được chắp bút của thế hệ tiếp theo. Câu chuyện đầy trớ trêu, trắc trở nhưng đầy nhân văn.\r\n\r\nTƯƠNG LAI CỦA CÔ LÀ THAM VỌNG\r\n\r\nFlorentyna Rosnovski – con gái Abel – với một ý chí sắt đá di truyền từ người cha, cô quyết tâm theo đuổi mục tiêu và lý tưởng của mình, đó là trở thành nữ Tổng thống Mỹ đầu tiên. Tuy thế, cuộc đời của cô, cũng giống như người cha của mình, cũng gặp vô cùng nhiều trắc trở mà người phụ nữ tham vọng này nhất định phải vượt qua.\r\n\r\nVới hình tượng được lấy cảm hứng từ những nhân cách lớn như “bà đầm thép” Margaret Thatcher, Golda Meer, hay Indira Gandhi, Jeffrey Archer đã trả lời cho độc giả những câu hỏi về cuộc đời và số phận, về ý nghĩa của cuộc sống này. Vượt qua cơn giông tố, vươn đến những vì sao chính là thông điệp mà cây bút tài ba muốn truyền tải.\"\r\n\r\nÝ NGHĨA NHAN ĐỀ\r\n\r\nTiểu thuyết Đứa con gái hoang đàng được dịch từ tên gốc The Prodigal Daughter. Cái tên này được Jeffrey Archer đặt theo một Dụ ngôn trong Kinh Thánh – The Prodigal Son. Ở Việt Nam, tích này được biết đến với cái tên Người con hoang đàng, hay Đứa con hoang đàng trở về. Cách đặt tên này tạo ra một sự kết nối chặt chẽ vói phần 1 – Hai số phận. Tiểu thuyết Hai số phận với tên gốc là Kane and Abel – vốn dĩ cũng là một biến thể của Cain and Abel – một Dụ ngôn khác trong Kinh Thánh.\r\n\r\nSỨC HẤP DẪN CỦA CUỐN SÁCH ĐỐI VỚI ĐỘC GIẢ\r\n\r\n“Một trong mười nhà văn có tài kể chuyện hay nhất thế giới.” – Los Angeles Times\r\n\r\n“Mạch truyện nhanh và lôi cuốn.” – Library Journal\r\n\r\n“Một bậc thầy trong việc pha trộn các yếu tố quyền lực, chính trị và danh vọng vào trong một cuốn tiểu thuyết.” – Entertainment Weekly\r\n\r\n“Một người kể chuyện ở đẳng cấp của Alexander Dumas, với kỹ năng vượt trội, Archer khiến độc giả không ngừng tự hỏi điều gì đang đón đợi phía trước.” – Washington Post\r\n\r\nTHÔNG TIN TÁC GIẢ\r\n\r\nJeffrey Archer (sinh ngày 15/4/1940) là một tiểu thuyết gia người Anh, cựu chính trị gia và là người tiên phong trong làng tiểu thuyết Anh Quốc.\r\n\r\nTrong suốt sự nghiệp sáng tác của mình, ông ghi dấu ấn với rất nhiều tiểu thuyết nổi tiếng, có thể kể đến : Hai số phận, Đứa con gái hoang đàng và các cuốn cùng series Biên niên Clifton: Chỉ thời gian có thể cất lời, Tội lỗi của người cha, Bí mật sâu kín nhất…\r\n\r\nÔng được mệnh danh là một trong những nhà văn có tài kể chuyện hay nhất.\r\n\r\nTHÔNG TIN VỀ SERIES “KANE VÀ ABEL”\r\n\r\nSeries về Kane và Abel của Jeffrey Archer xoay quanh những nhân vật của gia đình Rosnovski và Kane. Phần một với nhan đề Kane and Abel được xuất bản với tên tiếng Việt Hai số phận đã và đang là một cuốn sách bán chạy bậc nhất tại Việt Nam. Cuốn sách nói về William Kane và Abel Rosnovski – hai người anh em nhưng lại sinh ra ở hai hoàn cảnh trái ngược; cuốn sách là một câu chuyện cảm động về hành trình đi lên và vượt qua những thử thách. Đứa con gái hoang đàng (The Prodigal Daughter) tiếp nối câu chuyện giữa hai gia đình, có thể nói đây là phần hậu truyện của Hai số phận, cuốn sách nói về cuộc đời và số phận của thế hệ thứ hai, cụ thể hơn là Florentyna Rosnovski – con gái của Abel, khi gia đình Rosnovski đã định cư tại Mỹ.",
        "public": true,
        "publish_date": "2020",
        "author": "Jeffrey Archer",
        "amount": 836,
        "number_of_page": 836,
        "sold": 1,
        "rating": 5,
        "price": 148000,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/i/m/image_234117.jpg",
        "slug": "dua-con-gai-hoang-dang-the-prodigal-daughter",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 9,
            "name": "TIỂU THUYẾT",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-09T13:55:04.228Z"
        },
        "images": []
    },
    {
        "id": 273,
        "name": "Hiệu Sách Cuối Cùng Ở London - Tiểu Thuyết Về Chiến Tranh Thế Giới Thứ Hai",
        "description": "Hiệu Sách Cuối Cùng Ở London - Tiểu Thuyết Về Chiến Tranh Thế Giới Thứ Hai\r\n\r\nHiệu sách cuối cùng ở London là cuốn tiểu thuyết tình cảm hấp dẫn, là những trang sử ghi lại quãng thời gian khó khăn của người dân London trong Chiến tranh Thế giới thứ Hai. Được truyền cảm hứng từ quá khứ có thật của số ít hiệu sách còn tồn tại sau cuộc oanh kích của Đức quốc xã, cuốn sách đã kể lại một câu chuyện về những mất mát của thời chiến, về tình yêu và sức mạnh của văn chương giúp con người ta vượt qua giai đoạn đen tối nhất.\r\n\r\nCuốn sách đưa bạn quay trở lại thời điểm tháng 8 năm 1939, lúc ấy người dân London đang ráo riết chuẩn bị cho chiến tranh khi lực lượng của Hitler tràn qua châu Âu. Người hùng trong cuốn sách, Grace Bennett, là một cô gái luôn ấp ủ mong ước được chuyển đến London sinh sống. Khi cô cùng người bạn thân Viv đặt chân đến đây thì chiến tranh sắp sửa nổ ra. Hai cô gái đến sống cùng người bạn thân nhất của mẹ Grace, bà Weatherford, và cậu con trai của bà. Sau đó, Grace được giới thiệu tới làm việc tại hiệu sách Đồi Primrose. Vốn không phải là người được đọc nhiều sách do hoàn cảnh khách quan, cô chỉ dự định làm tại đó 6 tháng để xin được thư giới thiệu của ông chủ hiệu sách, rồi chuyển sang nơi khác làm việc cùng cô bạn thân.\r\n\r\nTrong quãng thời gian Grace làm việc tại hiệu sách Đồi Primrose, chiến tranh đã nổ ra. Đức quốc xã cho ném bom khắp thành phố London, phá hủy biết bao tòa nhà và cướp đi mạng sống của hàng nghìn người. Nhưng nhờ được làm việc trong hiệu sách và được truyền cảm hứng từ những người cô gặp nơi đây, Grace dần yêu thích sách hơn, và đồng thời cô đem tình yêu sách đó lan tỏa tới mọi người. Trải qua những đợt giới nghiêm, những đêm mưa bom bão đạn triền miên, cô đã khám phá ra sức mạnh của việc gắn kết cộng đồng thông qua việc đọc sách – một sức mạnh chiến thắng ngay cả trong những đêm đen tối nhất của cuộc chiến.\r\n\r\nHiệu sách cuối cùng ở London được ví như bức thư tình sâu lắng và xúc động, bởi trong đó là vô vàn những câu chuyện tình yêu: tình yêu đôi lứa, tình yêu văn chương, tình cảm gia đình và bạn bè, tình đoàn kết trong một cộng đồng, tình yêu đất nước,… Nhờ những tình cảm đó mà hiệu sách Đồi Primrose – nơi gắn kết trái tim – đã may mắn trở thành hiệu sách duy nhất còn sót lại ở London, dù cũng từng một lần bị mưa bom của Đức quốc xã giội xuống.\r\n\r\nVới thông điệp nhấn mạnh sức mạnh của sách giúp con người vượt qua mọi quãng thời gian đen tối, khó khăn, Hiệu sách cuối cùng ở London đã nhận được rất nhiều sự quan tâm và yêu thích của độc giả trên toàn cầu, đồng thời đạt được nhiều thành tích ấn tượng ngay sau khi xuất bản. Đó là lý do tại sao cuốn sách này đáng được bạn đầu tư thời gian để đọc nó!\r\n\r\nThông tin về tác giả:\r\n\r\nMadeline Martin là tác giả sách bán chạy nhất được hai tờ báo New York Times và USA TODAY bình chọn. Sau khi tốt nghiệp trường Đại học Flagler với tấm bằng cử nhân Quản trị kinh doanh, Madeline làm việc cho một tập đoàn tại Mỹ. Là người yêu thích lịch sử và dành trọn thời gian, tâm trí nghiên cứu lĩnh vực này, những tác phẩm của bà thường là tiểu thuyết lịch sử lãng mạn và tiểu thuyết lịch sử hư cấu.\r\n\r\nMã hàng\t8935210302168\r\nTên Nhà Cung Cấp\tTân Việt\r\nTác giả\tMadeline Martin\r\nNgười Dịch\tPhương Hạ\r\nNXB\tVăn Học\r\nNăm XB\t2022\r\nTrọng lượng (gr)\t400\r\nKích Thước Bao Bì\t20.5 x 14.5 x 1.3 cm\r\nSố trang\t402\r\nHình thức\tBìa Mềm\r\nSản phẩm hiển thị trong\t\r\nTân Việt\r\nRƯỚC DEAL LINH ĐÌNH VUI ĐÓN TRUNG THU\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Tiểu thuyết bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nHiệu Sách Cuối Cùng Ở London - Tiểu Thuyết Về Chiến Tranh Thế Giới Thứ Hai\r\n\r\nHiệu sách cuối cùng ở London là cuốn tiểu thuyết tình cảm hấp dẫn, là những trang sử ghi lại quãng thời gian khó khăn của người dân London trong Chiến tranh Thế giới thứ Hai. Được truyền cảm hứng từ quá khứ có thật của số ít hiệu sách còn tồn tại sau cuộc oanh kích của Đức quốc xã, cuốn sách đã kể lại một câu chuyện về những mất mát của thời chiến, về tình yêu và sức mạnh của văn chương giúp con người ta vượt qua giai đoạn đen tối nhất.\r\n\r\nCuốn sách đưa bạn quay trở lại thời điểm tháng 8 năm 1939, lúc ấy người dân London đang ráo riết chuẩn bị cho chiến tranh khi lực lượng của Hitler tràn qua châu Âu. Người hùng trong cuốn sách, Grace Bennett, là một cô gái luôn ấp ủ mong ước được chuyển đến London sinh sống. Khi cô cùng người bạn thân Viv đặt chân đến đây thì chiến tranh sắp sửa nổ ra. Hai cô gái đến sống cùng người bạn thân nhất của mẹ Grace, bà Weatherford, và cậu con trai của bà. Sau đó, Grace được giới thiệu tới làm việc tại hiệu sách Đồi Primrose. Vốn không phải là người được đọc nhiều sách do hoàn cảnh khách quan, cô chỉ dự định làm tại đó 6 tháng để xin được thư giới thiệu của ông chủ hiệu sách, rồi chuyển sang nơi khác làm việc cùng cô bạn thân.\r\n\r\nTrong quãng thời gian Grace làm việc tại hiệu sách Đồi Primrose, chiến tranh đã nổ ra. Đức quốc xã cho ném bom khắp thành phố London, phá hủy biết bao tòa nhà và cướp đi mạng sống của hàng nghìn người. Nhưng nhờ được làm việc trong hiệu sách và được truyền cảm hứng từ những người cô gặp nơi đây, Grace dần yêu thích sách hơn, và đồng thời cô đem tình yêu sách đó lan tỏa tới mọi người. Trải qua những đợt giới nghiêm, những đêm mưa bom bão đạn triền miên, cô đã khám phá ra sức mạnh của việc gắn kết cộng đồng thông qua việc đọc sách – một sức mạnh chiến thắng ngay cả trong những đêm đen tối nhất của cuộc chiến.\r\n\r\nHiệu sách cuối cùng ở London được ví như bức thư tình sâu lắng và xúc động, bởi trong đó là vô vàn những câu chuyện tình yêu: tình yêu đôi lứa, tình yêu văn chương, tình cảm gia đình và bạn bè, tình đoàn kết trong một cộng đồng, tình yêu đất nước,… Nhờ những tình cảm đó mà hiệu sách Đồi Primrose – nơi gắn kết trái tim – đã may mắn trở thành hiệu sách duy nhất còn sót lại ở London, dù cũng từng một lần bị mưa bom của Đức quốc xã giội xuống.\r\n\r\nVới thông điệp nhấn mạnh sức mạnh của sách giúp con người vượt qua mọi quãng thời gian đen tối, khó khăn, Hiệu sách cuối cùng ở London đã nhận được rất nhiều sự quan tâm và yêu thích của độc giả trên toàn cầu, đồng thời đạt được nhiều thành tích ấn tượng ngay sau khi xuất bản. Đó là lý do tại sao cuốn sách này đáng được bạn đầu tư thời gian để đọc nó!\r\n\r\nThông tin về tác giả:\r\n\r\nMadeline Martin là tác giả sách bán chạy nhất được hai tờ báo New York Times và USA TODAY bình chọn. Sau khi tốt nghiệp trường Đại học Flagler với tấm bằng cử nhân Quản trị kinh doanh, Madeline làm việc cho một tập đoàn tại Mỹ. Là người yêu thích lịch sử và dành trọn thời gian, tâm trí nghiên cứu lĩnh vực này, những tác phẩm của bà thường là tiểu thuyết lịch sử lãng mạn và tiểu thuyết lịch sử hư cấu.",
        "public": true,
        "publish_date": "2021",
        "author": "Madeline Martin",
        "amount": 12323,
        "number_of_page": 402,
        "sold": 1,
        "rating": 5,
        "price": 108000,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/8/9/8935210302168_1.jpg",
        "slug": "hieu-sach-cuoi-cung-o-london-tieu-thuyet-ve-chien-tranh-the-gioi-thu-hai",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 9,
            "name": "TIỂU THUYẾT",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-09T13:55:04.228Z"
        },
        "images": []
    },
    {
        "id": 274,
        "name": "Quái Vật Trong Quán Đồ Nướng",
        "description": "Quái Vật Trong Quán Đồ Nướng\r\n\r\nSái Tất Quý là một tiểu thuyết gia làng nhàng, đang lúc bất đắc chí, anh tình cờ quen biết cô chủ quán đồ nướng bí ẩn Sở Gia và nhận được một công việc kỳ lạ: mỗi tối thứ Tư hàng tuần đến quán nghe thực khách kể về những chuyện ly kỳ mà họ đích thân trải qua rồi ghi chép lại.\r\n\r\nNgười ngoài hành tinh bắt cóc trẻ em, hành khách biến mất giữa không trung, bưu kiện chuyển phát nhanh mang lại tai họa cho người nhận, cô gái luân hồi chuyển kiếp trở về, con quái vật trong hình hài bé gái… Những câu chuyện nhuốm đầy màu sắc kinh dị kỳ bí ấy, hóa ra vẫn xảy ra ngay bên cạnh chúng ta ngày ngày. Đi sâu vào thế giới rùng rợn mà thân quen nọ, ta lại thấy thứ đáng sợ nhất chẳng phải yêu ma quỷ quái, mà chính là lòng dạ con người.\r\n\r\nSái Tất Quý (còn gọi là Quỷ Thúc), hội viên hội nhà văn tỉnh Quảng Đông, tác giả trinh thám kinh dị khá nổi tiếng với hơn 5 triệu fan trên weibo. Anh thích chạy bộ và viết văn, phong cách viết đa dạng, phóng khoáng, từng xuất bản khá nhiều tiểu thuyết. Tác phẩm của anh giàu sức tưởng tượng và mang cả sắc thái khoa học huyễn tưởng.\r\n\r\nCác tác phẩm khác:\r\n\r\n- Sổ sự kiện kỳ dị của quái nhân\r\n\r\nTiểu thuyết Quái vật trong quán đồ nướng của anh cũng đã được chuyển thể thành phim điện ảnh.\r\n\r\nMã hàng\t8935235238275\r\nTên Nhà Cung Cấp\tNhã Nam\r\nTác giả\tSái Tất Quý\r\nNXB\tHà Nội\r\nNăm XB\t2023\r\nNgôn Ngữ\tTiếng Việt\r\nTrọng lượng (gr)\t550\r\nKích Thước Bao Bì\t20.5 x 14 x 1.9 cm\r\nSố trang\t393\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Tiểu thuyết bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nQuái Vật Trong Quán Đồ Nướng\r\n\r\nSái Tất Quý là một tiểu thuyết gia làng nhàng, đang lúc bất đắc chí, anh tình cờ quen biết cô chủ quán đồ nướng bí ẩn Sở Gia và nhận được một công việc kỳ lạ: mỗi tối thứ Tư hàng tuần đến quán nghe thực khách kể về những chuyện ly kỳ mà họ đích thân trải qua rồi ghi chép lại.\r\n\r\nNgười ngoài hành tinh bắt cóc trẻ em, hành khách biến mất giữa không trung, bưu kiện chuyển phát nhanh mang lại tai họa cho người nhận, cô gái luân hồi chuyển kiếp trở về, con quái vật trong hình hài bé gái… Những câu chuyện nhuốm đầy màu sắc kinh dị kỳ bí ấy, hóa ra vẫn xảy ra ngay bên cạnh chúng ta ngày ngày. Đi sâu vào thế giới rùng rợn mà thân quen nọ, ta lại thấy thứ đáng sợ nhất chẳng phải yêu ma quỷ quái, mà chính là lòng dạ con người.\r\n\r\nSái Tất Quý (còn gọi là Quỷ Thúc), hội viên hội nhà văn tỉnh Quảng Đông, tác giả trinh thám kinh dị khá nổi tiếng với hơn 5 triệu fan trên weibo. Anh thích chạy bộ và viết văn, phong cách viết đa dạng, phóng khoáng, từng xuất bản khá nhiều tiểu thuyết. Tác phẩm của anh giàu sức tưởng tượng và mang cả sắc thái khoa học huyễn tưởng.\r\n\r\nCác tác phẩm khác:\r\n\r\n- Sổ sự kiện kỳ dị của quái nhân\r\n\r\nTiểu thuyết Quái vật trong quán đồ nướng của anh cũng đã được chuyển thể thành phim điện ảnh.",
        "public": true,
        "publish_date": "2022",
        "author": "Sái Tất Quý",
        "amount": 350,
        "number_of_page": 393,
        "sold": 78,
        "rating": 5,
        "price": 142200,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/8/9/8935235238275.jpg",
        "slug": "quai-vat-trong-quan-do-nuong",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-10T03:47:46.701Z",
        "category": {
            "id": 9,
            "name": "TIỂU THUYẾT",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-09T13:55:04.228Z"
        },
        "images": []
    },
    {
        "id": 275,
        "name": "Bà Tổng Thống Trước Họng Súng - Shall We Tell The President",
        "description": "Ở kết thúc cuốn Đứa con gái hoang đàng, Florentyna Kane đã được bầu làm Tổng thống – vị nữ Tổng thống đầu tiên của Hợp chủng quốc Hoa Kỳ. Sau hàng thập kỷ đấu tranh, hy sinh, và nếm trải bi kịch cá nhân, bà cuối cùng cũng đạt được mục tiêu của mình. Tuy nhiên, ngay khi bà có bài phát biểu chính thức đầu tiên, những kẻ chống đối bà đang âm mưu khiến bà phải im lặng mãi mãi.\r\n\r\n7 giờ 30 phút một tối nọ, FBI nhận được thông tin về âm mưu ám sát bà Tổng thống. Đến 8 giờ 30 phút, có năm người biết được những thông tin về âm mưu ám sát. 9 giờ 30 phút, bốn người trong số họ bị giết.\r\n\r\nNgười duy nhất còn sống, đặc vụ FBI Mark Andrews, biết về thười điểm bọn sát thủ sẽ hành động và biết được âm mưu này có liên quan đến một vị Thượng Nghị Sĩ, còn về địa điểm, cách thức hay điều quan trọng nhất là danh tỉnh của bọn chúng, anh đều không biết gì. Anh chỉ có sáu ngày để tìm ra kẻ chủ mưu. Trong sáu ngày đó, anh không có thời gian để lãng phí, không được để lại dấu vết, và không được tin tưởng bất kỳ ai. Anh chỉ có sáu ngày để ngăn chặn thứ đang đe dọa sự an nguy của Tổng thống.\r\n\r\nMột từ không đúng, một bước đi sai lầm, và cả một quốc gia lẫn giấc mơ hoài bão sẽ sụp đổ.\r\n\r\nTHÔNG TIN TÁC GIẢ\r\n\r\nJeffrey Archer (sinh ngày 15/4/1940) là một tiểu thuyết gia người Anh, cựu chính trị gia và là người tiên phong trong làng tiểu thuyết Anh Quốc.\r\n\r\nTrong suốt sự nghiệp sáng tác của mình, ông ghi dấu ấn với rất nhiều tiểu thuyết nổi tiếng, có thể kể đến : Hai số phận, Đứa con gái hoang đàng và các cuốn cùng series Biên niên Clifton: Chỉ thời gian có thể cất lời, Tội lỗi của người cha, Bí mật sâu kín nhất…\r\n\r\nÔng được mệnh danh là một trong những nhà văn có tài kể chuyện hay nhất.\r\n\r\nTHÔNG TIN VỀ SERIES “KANE VÀ ABEL”\r\n\r\nSeries về Kane và Abel của Jeffrey Archer xoay quanh những nhân vật của gia đình Rosnovski và Kane. Phần một với nhan đề Kane and Abel được xuất bản với tên tiếng Việt Hai số phận đã và đang là một cuốn sách bán chạy bậc nhất tại Việt Nam. Cuốn sách nói về William Kane và Abel Rosnovski – hai người anh em nhưng lại sinh ra ở hai hoàn cảnh trái ngược; cuốn sách là một câu chuyện cảm động về hành trình đi lên và vượt qua những thử thách. Đứa con gái hoang đàng (The Prodigal Daughter) tiếp nối câu chuyện giữa hai gia đình, có thể nói đây là phần hậu truyện của Hai số phận, cuốn sách nói về cuộc đời và số phận của thế hệ thứ hai, cụ thể hơn là Florentyna Rosnovski – con gái của Abel, khi gia đình Rosnovski đã định cư tại Mỹ.\r\n\r\nVà cuối cùng là phần 3 – Bà Tổng thống trước họng súng, tiếp nối câu chuyện dang dở của Đứa con gái hoàng đàng, là câu chuyện về những mối đe dọa mà bà Florentyna phải trải qua khi đã trở thành Tổng thống Mỹ. Không chỉ cam go và gay cấn, hành trình từ buổi lễ tuyên thệ nhậm chức của nữ Tổng thống còn hết sức li kỳ và hấp dẫn.\r\n\r\nMã hàng\t9786043261028\r\nTên Nhà Cung Cấp\tBách Việt\r\nTác giả\tJeffrey Archer\r\nNgười Dịch\tKiều Hòa\r\nNXB\tNXB Thanh Niên\r\nNăm XB\t2021\r\nNgôn Ngữ\tTiếng Việt\r\nTrọng lượng (gr)\t500\r\nKích Thước Bao Bì\t20.5 x 13.5 cm\r\nSố trang\t488\r\nHình thức\tBìa Mềm\r\nSản phẩm hiển thị trong\t\r\nBách Việt\r\nFlashsale\r\nMã Giảm Giá\r\nRƯỚC DEAL LINH ĐÌNH VUI ĐÓN TRUNG THU\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Tiểu thuyết bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nỞ kết thúc cuốn Đứa con gái hoang đàng, Florentyna Kane đã được bầu làm Tổng thống – vị nữ Tổng thống đầu tiên của Hợp chủng quốc Hoa Kỳ. Sau hàng thập kỷ đấu tranh, hy sinh, và nếm trải bi kịch cá nhân, bà cuối cùng cũng đạt được mục tiêu của mình. Tuy nhiên, ngay khi bà có bài phát biểu chính thức đầu tiên, những kẻ chống đối bà đang âm mưu khiến bà phải im lặng mãi mãi.\r\n\r\n7 giờ 30 phút một tối nọ, FBI nhận được thông tin về âm mưu ám sát bà Tổng thống. Đến 8 giờ 30 phút, có năm người biết được những thông tin về âm mưu ám sát. 9 giờ 30 phút, bốn người trong số họ bị giết.\r\n\r\nNgười duy nhất còn sống, đặc vụ FBI Mark Andrews, biết về thười điểm bọn sát thủ sẽ hành động và biết được âm mưu này có liên quan đến một vị Thượng Nghị Sĩ, còn về địa điểm, cách thức hay điều quan trọng nhất là danh tỉnh của bọn chúng, anh đều không biết gì. Anh chỉ có sáu ngày để tìm ra kẻ chủ mưu. Trong sáu ngày đó, anh không có thời gian để lãng phí, không được để lại dấu vết, và không được tin tưởng bất kỳ ai. Anh chỉ có sáu ngày để ngăn chặn thứ đang đe dọa sự an nguy của Tổng thống.\r\n\r\nMột từ không đúng, một bước đi sai lầm, và cả một quốc gia lẫn giấc mơ hoài bão sẽ sụp đổ.\r\n\r\nTHÔNG TIN TÁC GIẢ\r\n\r\nJeffrey Archer (sinh ngày 15/4/1940) là một tiểu thuyết gia người Anh, cựu chính trị gia và là người tiên phong trong làng tiểu thuyết Anh Quốc.\r\n\r\nTrong suốt sự nghiệp sáng tác của mình, ông ghi dấu ấn với rất nhiều tiểu thuyết nổi tiếng, có thể kể đến : Hai số phận, Đứa con gái hoang đàng và các cuốn cùng series Biên niên Clifton: Chỉ thời gian có thể cất lời, Tội lỗi của người cha, Bí mật sâu kín nhất…\r\n\r\nÔng được mệnh danh là một trong những nhà văn có tài kể chuyện hay nhất.\r\n\r\nTHÔNG TIN VỀ SERIES “KANE VÀ ABEL”\r\n\r\nSeries về Kane và Abel của Jeffrey Archer xoay quanh những nhân vật của gia đình Rosnovski và Kane. Phần một với nhan đề Kane and Abel được xuất bản với tên tiếng Việt Hai số phận đã và đang là một cuốn sách bán chạy bậc nhất tại Việt Nam. Cuốn sách nói về William Kane và Abel Rosnovski – hai người anh em nhưng lại sinh ra ở hai hoàn cảnh trái ngược; cuốn sách là một câu chuyện cảm động về hành trình đi lên và vượt qua những thử thách. Đứa con gái hoang đàng (The Prodigal Daughter) tiếp nối câu chuyện giữa hai gia đình, có thể nói đây là phần hậu truyện của Hai số phận, cuốn sách nói về cuộc đời và số phận của thế hệ thứ hai, cụ thể hơn là Florentyna Rosnovski – con gái của Abel, khi gia đình Rosnovski đã định cư tại Mỹ.\r\n\r\nVà cuối cùng là phần 3 – Bà Tổng thống trước họng súng, tiếp nối câu chuyện dang dở của Đứa con gái hoàng đàng, là câu chuyện về những mối đe dọa mà bà Florentyna phải trải qua khi đã trở thành Tổng thống Mỹ. Không chỉ cam go và gay cấn, hành trình từ buổi lễ tuyên thệ nhậm chức của nữ Tổng thống còn hết sức li kỳ và hấp dẫn.",
        "public": true,
        "publish_date": "2020",
        "author": "Jeffrey Archer\r\n",
        "amount": 488,
        "number_of_page": 488,
        "sold": 1,
        "rating": 5,
        "price": 143650,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/i/m/image_244718_1_2082.jpg",
        "slug": "ba-tong-thong-truoc-hong-sung-shall-we-tell-the-president",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 9,
            "name": "TIỂU THUYẾT",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-09T13:55:04.228Z"
        },
        "images": []
    },
    {
        "id": 276,
        "name": "Cô Thành Trong Gương",
        "description": "Năm 2018, tác phẩm Cô thành trong gương đạt giải Honyataishou (giải thưởng do các nhà sách toàn Nhật Bản bầu chọn) lần thứ 15 và trở thành sách bán chạy tại Nhật.\r\n\r\nTÓM TẮT:\r\n\r\nVì một tổn thương tâm lý, Kokoro từ chối đến trường, nhốt mình trong phòng. Những ngày tháng nhàm chán và buồn bã lặng lẽ trôi qua, cho đến một hôm, cô bé phát hiện tấm gương trong phòng mình phát sáng. Bước qua tấm gương, Kokoro nhận ra mình đang ở trong một tòa lâu đài lộng lẫy, cùng sáu người bạn chung hoàn cảnh.\r\n\r\nHọ được tập hợp tại đó bởi ai và với mục đích gì? Bảy đứa trẻ cô độc buộc phải dấn bước vào một cuộc phiêu lưu kỳ lạ, trước khi đáp án cuối cùng mở ra, gây sững sờ và xúc động tột cùng.\r\n\r\nMột câu chuyện tiếp thêm dũng khí cho tất cả những người lạc ra khỏi vòng quay cuộc sống, sẽ cuốn hút bạn cho tới những trang sách cuối.\r\n\r\nVỀ TÁC GIẢ:\r\n\r\nTsujimura Mizuki sinh tại tỉnh Yamanashi, Nhật Bản và là một nhà văn nổi tiếng, chủ nhân của rất nhiều giải thưởng văn học. Năm 2004, Tsujimura Mizuki đạt giải Mephisto với tác phẩm ra mắt Khu học xá bị lãng quên (tạm dịch). Năm 2011, cô tiếp tục đạt giải tác giả mới, giải thưởng Yoshikawaeijibungaku với tác phẩm Kết nối (tạm dịch). Chưa dừng ở đó, năm 2012, Tsujimura Mizuki thắng giải Naoki lần thứ 147 cùng tác phẩm Giấc mơ không lối thoát (tạm dịch).\r\n\r\nMã hàng\t8935235227583\r\nTên Nhà Cung Cấp\tNhã Nam\r\nTác giả\t Tsujimura Mizuki\r\nNgười Dịch\tThanh Trà\r\nNXB\tNXB Hà Nội\r\nNăm XB\t2020\r\nTrọng lượng (gr)\t600\r\nKích Thước Bao Bì\t20.5 x 14 cm\r\nSố trang\t564\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Tiểu thuyết bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nNăm 2018, tác phẩm Cô thành trong gương đạt giải Honyataishou (giải thưởng do các nhà sách toàn Nhật Bản bầu chọn) lần thứ 15 và trở thành sách bán chạy tại Nhật.\r\n\r\nTÓM TẮT:\r\n\r\nVì một tổn thương tâm lý, Kokoro từ chối đến trường, nhốt mình trong phòng. Những ngày tháng nhàm chán và buồn bã lặng lẽ trôi qua, cho đến một hôm, cô bé phát hiện tấm gương trong phòng mình phát sáng. Bước qua tấm gương, Kokoro nhận ra mình đang ở trong một tòa lâu đài lộng lẫy, cùng sáu người bạn chung hoàn cảnh.\r\n\r\nHọ được tập hợp tại đó bởi ai và với mục đích gì? Bảy đứa trẻ cô độc buộc phải dấn bước vào một cuộc phiêu lưu kỳ lạ, trước khi đáp án cuối cùng mở ra, gây sững sờ và xúc động tột cùng.\r\n\r\nMột câu chuyện tiếp thêm dũng khí cho tất cả những người lạc ra khỏi vòng quay cuộc sống, sẽ cuốn hút bạn cho tới những trang sách cuối.\r\n\r\nVỀ TÁC GIẢ:\r\n\r\nTsujimura Mizuki sinh tại tỉnh Yamanashi, Nhật Bản và là một nhà văn nổi tiếng, chủ nhân của rất nhiều giải thưởng văn học. Năm 2004, Tsujimura Mizuki đạt giải Mephisto với tác phẩm ra mắt Khu học xá bị lãng quên (tạm dịch). Năm 2011, cô tiếp tục đạt giải tác giả mới, giải thưởng Yoshikawaeijibungaku với tác phẩm Kết nối (tạm dịch). Chưa dừng ở đó, năm 2012, Tsujimura Mizuki thắng giải Naoki lần thứ 147 cùng tác phẩm Giấc mơ không lối thoát (tạm dịch).\r\n\r\n",
        "public": true,
        "publish_date": "2019",
        "author": "Tsujimura Mizuki",
        "amount": 564,
        "number_of_page": 564,
        "sold": 39,
        "rating": 5,
        "price": 185300,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/8/9/8935235227583.jpg",
        "slug": "co-thanh-trong-guong",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-10T03:47:46.702Z",
        "category": {
            "id": 9,
            "name": "TIỂU THUYẾT",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-09T13:55:04.228Z"
        },
        "images": []
    },
    {
        "id": 277,
        "name": "Trần Nhật Duật",
        "description": "TRẦN NHẬT DUẬT\r\n\r\nTiểu thuyết dã sử Chiêu Văn Vương TRẦN NHẬT DUẬT\r\n\r\nChiêu Văn Vương Trần Nhật Duật là một nhà chính trị, nhà quân sựtài ba của nước Đại Việtta thờiTrần. Ông là con trai thứ sáu củaTrần Thái Tôngvà là một danh tướng củavương triều nhà Trầntronglịch sử Việt Nam. Ông là người có công trong cuộckháng chiến chống quân Nguyên Mônglần thứ hai và thứ ba, đặc biệt làtrận Hàm Tử.\r\n\r\nCuốn sách dẫn dắt bạn đọc ngay từ những ngày Trần Nhật Duật còn thơ bé, là những ngày ông với hoàng tử Ích Tắc cùng học thi, thư, quốc sử. Sau, ông là người sáng dạ hơn hẳn nên được phong Chiêu Văn Vương và được ban lệnh đến đất Trúc Sơn dọc ngang ba mươi dặm, cách kinh thành năm mươi dặm về phía Tây làm đất dựng phủ đệ. Với tài kinh luân, văn võ song toàn, Trần Nhật Duật đã được vua Trần Nhân Tông phái đến trông coi đạo Đà Giang, chiêu dụ Trịnh Giác Mật đầu hàng. Thu phục xong Giác Mật, yên được lộ Đà Giang, khiến nhà Trần yên ổn được biên giới Tây Bắc để tập trung chống quân Mông Nguyên. Sau ông được bổ dụng làm trấn thủ lộ Tuyên Quang. Đánh tan quân Toa Đô trên đất Thanh Hoa.\r\n\r\nTrần Nhật Duật còn là một vị tướng ôn hòa, được nhiều người yêu quý, trọng vọng. Ông đã nuôi dạy hoàng tử Trần Mạnh giúp vua Anh Tông một cách chu đáo, ông còn đặt tên cho hoàng tử là Thánh Sinh để gần giống với tên các con mình. Khi Trần Anh Tông đem quân chinh phạt Chiêm Thành, ông cũng cùng với Nghi Võ Hầu Quốc Tú và hoàng tử Mạnh bắt được vua Chiêm làChế Chívề kinh sư.\r\n\r\nLời khuyên của Biên tập viên dành cho việc đọc cuốn sách\r\n\r\nĐọc cuốn sách này sẽ giúp chúng ta càng hiểu rõ thêm về vị danh tướng mưu lược Trần Nhật Duật, về những chiến công cũng như tài kinh bang tế thế của vị tể tướng Đại Việt.\r\n\r\nCâu nói hay dành tặng bạn\r\n\r\n“Cho nên chiến công đánh bại giặc Nguyên,\r\nNhật Duật lập được nhiều hơn cả”\r\n(Đại Việt Sử ký toàn thư)\r\n\r\nMã hàng\t8936107812623\r\nTên Nhà Cung Cấp\tCÔNG TY TNHH SÁCH & TRUYỀN THÔNG VIỆT NAM\r\nTác giả\tPhù Ninh\r\nNXB\tNXB Văn Học\r\nNăm XB\t2021\r\nNgôn Ngữ\tTiếng Việt\r\nTrọng lượng (gr)\t250\r\nKích Thước Bao Bì\t20.5 x 14.5 x 1.3cm\r\nSố trang\t236\r\nHình thức\tBìa Mềm\r\nSản phẩm hiển thị trong\t\r\nCÔNG TY TNHH SÁCH & TRUYỀN THÔNG VIỆT NAM\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Tiểu thuyết bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nTRẦN NHẬT DUẬT\r\n\r\nTiểu thuyết dã sử Chiêu Văn Vương TRẦN NHẬT DUẬT\r\n\r\nChiêu Văn Vương Trần Nhật Duật là một nhà chính trị, nhà quân sựtài ba của nước Đại Việtta thờiTrần. Ông là con trai thứ sáu củaTrần Thái Tôngvà là một danh tướng củavương triều nhà Trầntronglịch sử Việt Nam. Ông là người có công trong cuộckháng chiến chống quân Nguyên Mônglần thứ hai và thứ ba, đặc biệt làtrận Hàm Tử.\r\n\r\nCuốn sách dẫn dắt bạn đọc ngay từ những ngày Trần Nhật Duật còn thơ bé, là những ngày ông với hoàng tử Ích Tắc cùng học thi, thư, quốc sử. Sau, ông là người sáng dạ hơn hẳn nên được phong Chiêu Văn Vương và được ban lệnh đến đất Trúc Sơn dọc ngang ba mươi dặm, cách kinh thành năm mươi dặm về phía Tây làm đất dựng phủ đệ. Với tài kinh luân, văn võ song toàn, Trần Nhật Duật đã được vua Trần Nhân Tông phái đến trông coi đạo Đà Giang, chiêu dụ Trịnh Giác Mật đầu hàng. Thu phục xong Giác Mật, yên được lộ Đà Giang, khiến nhà Trần yên ổn được biên giới Tây Bắc để tập trung chống quân Mông Nguyên. Sau ông được bổ dụng làm trấn thủ lộ Tuyên Quang. Đánh tan quân Toa Đô trên đất Thanh Hoa.\r\n\r\nTrần Nhật Duật còn là một vị tướng ôn hòa, được nhiều người yêu quý, trọng vọng. Ông đã nuôi dạy hoàng tử Trần Mạnh giúp vua Anh Tông một cách chu đáo, ông còn đặt tên cho hoàng tử là Thánh Sinh để gần giống với tên các con mình. Khi Trần Anh Tông đem quân chinh phạt Chiêm Thành, ông cũng cùng với Nghi Võ Hầu Quốc Tú và hoàng tử Mạnh bắt được vua Chiêm làChế Chívề kinh sư.\r\n\r\nLời khuyên của Biên tập viên dành cho việc đọc cuốn sách\r\n\r\nĐọc cuốn sách này sẽ giúp chúng ta càng hiểu rõ thêm về vị danh tướng mưu lược Trần Nhật Duật, về những chiến công cũng như tài kinh bang tế thế của vị tể tướng Đại Việt.\r\n\r\nCâu nói hay dành tặng bạn\r\n\r\n“Cho nên chiến công đánh bại giặc Nguyên,\r\nNhật Duật lập được nhiều hơn cả”\r\n(Đại Việt Sử ký toàn thư)",
        "public": true,
        "publish_date": "2020",
        "author": "Phù Ninh",
        "amount": 236,
        "number_of_page": 236,
        "sold": 1,
        "rating": 5,
        "price": 109650,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/i/m/image_244718_1_5086.jpg",
        "slug": "tran-nhat-duat",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 9,
            "name": "TIỂU THUYẾT",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-09T13:55:04.228Z"
        },
        "images": []
    },
    {
        "id": 278,
        "name": "Nguyệt Thư Ảnh Kiếm",
        "description": "Trong chính sử, câu chuyện về Trần Cảnh – Lý Chiêu Hoàng là một trường hợp vô tiền khoáng hậu. Đó là cuộc chuyển giao vương quyền êm thuận nhất, ko tốn một giọt máu, giữa hai triều đại lớn của nước Việt, từ triều Lý với hơn 200 năm cai trị chuyển sang triều Trần kiêu dũng hùng cường. Nguyệt thư ảnh kiếm căn cứ từ những tư liệu lịch sử có thật, phóng tác lên thành một câu chuyện dã sử hấp dẫn, lãng mạn. Do không có con trai nối dõi, vua Lý Huệ Tông đã quyết định lập con gái thứ là Lý Phật Kim làm thái tử, sau đó lên ngôi lấy hiệu là Lý Chiêu Hoàng, trở thành vị nữ vương độc nhất của triều Lý. Lúc đó, với thế lực đang mạnh, tham vọng khôn cùng, thấy vua nữ còn nhỏ, nhà Lý suy yếu, Trần Thủ Độ mưu soán ngôi, bèn bố trí cháu mình là Trần Cảnh gần gũi hầu hạ tiểu nữ vương, từ đó ép nữ vương truyền ngôi cho nhà Trần, Trần Cảnh thành vua Trần Thái Tông. Đôi trẻ yêu nhau trong bối cảnh éo le, lúc tan lúc hợp, do chính trị luôn đứng giữa... Sau rất nhiều hiểu lầm, mất mát tổn thương, Trần Cảnh và Lý Chiêu Hoàng đứng trước mối họa xâm lăng từ quân Mông Nguyên, đã quyết gạt tình thù, đặt quốc gia lên trên hết. Nguyệt thư ảnh kiếm pháp vốn là uyên ương kiếm gia truyền của tộc Trần, đã trở thành vũ khí tiên phong cùng hào khí Đông A đánh tan quân giặc, hóa giải thù riêng giữa 2 dòng tộc hùng mạnh nhất trong lịch sử phong kiến Việt Nam.\r\n\r\nTác giả trẻ, có kiến văn tốt, yêu sử Việt. Khi đọc truyện, ngoài việc bị cuốn hút bởi tình tiết truyện, độc giả sẽ như được tiếp cận với các nhân vật vua chúa nhưng rất đỗi gần gũi, tưởng như người bằng xương bằng thịt, từ đó, giúp lịch sử dễ hiểu dễ cảm hơn. Sự thật chính sử được giữ nguyên, các nhân vật lịch sử như Trần Cảnh, Lý Chiêu Hoàng, Trần Thủ Độ, Trần Liễu, Trần Thị Dung, Ngột Lương Hợp Đài, Lê Phụ Trần... được khắc họa sáng tạo và thuyết phục ở góc nhìn trẻ trung lãng mạn. Tác giả lý giải lịch sử bằng sự đề cao sức mạnh tình cảm gia đình, tình huyết thống thiêng liêng. Thiên mệnh và nhân tình huyết mạch, những yếu tố đó tạo nên lòng tự tôn và sức mạnh hùng cường cho dân tộc, để cùng nhau đoàn kết chống ngoại xâm giữ yên bờ cõi, đồng thời xây dựng một đất nước phồn thịnh thời Lý – Trần.\r\n\r\nNhà xuất bản Phụ nữ VN trân trọng giới thiệu cùng bạn đọc.\r\n\r\nTác giả:\r\n\r\nBÌNH CHI\r\n\r\nTên thật: Nguyễn Thu Nga\r\n\r\nXem tiểu thuyết Kim Dung như một người bạn, và những triết lý Phật Giáo, triết lý Tình Yêu ẩn dưới những câu chuyện giang hồ trong truyện Kim Dung ảnh hưởng lớn đến lối viết của tác giả. Tác giả có thời gian dài học tập tại Nhật Bản và Anh quốc. Qua việc tiếp cận chữ Hán, học thư pháp, vẽ tranh thủy mặc, tác giả nhìn thấy được tình yêu của người Nhật và người Hoa với văn hóa của họ, nhờ đó mà lại càng khao khát muốn tìm về gốc rễ của mình, mong phần nào cắt nghĩa con người và văn hóa Việt Nam tự cổ chí kim. Vẽ lại những con người Việt, bằng chất liệu hội họa và văn học, trở thành đề tài mà tác giả theo đuổi.\r\n\r\nMột số trích đoạn hay:\r\n\r\n1. Kiếm pháp gia truyền “Nguyệt thư ảnh kiếm” của tộc Trần\r\n\r\n“Tập hết sáu mươi chiêu, hai người cùng mở mắt ra, thì đều không khỏi giật mình bởi đường kiếm của phu thê họ đã gom gió thành vũ bão, khiến cho năm sáu cây đào quanh đó run rẩy, trút xuống một cơn hồng đào hoa vũ, rực rỡ vô cùng.\r\n\r\nLão tổ tông cả mừng, hỏi:\r\n\r\n- Kiếm pháp của hai ta, không biết nên đặt tên là gì?”\r\n\r\n- Nhờ ánh trăng kia in bóng mình trên sân thành hình văn tự mà hai ta ngộ ra được. Hay đặt tên là Nguyệt Thư Ảnh kiếm pháp (月書影劍法)?\r\n\r\n... Thời gian cứ thế thấm thoát trôi qua. Hai vị tổ tông dù tài giỏi cách mấy cũng không tránh được số kiếp con người là sinh, lão, bệnh, tử. Khi mất đi, ngoài gia sản khổng lồ cùng với bộ kiếm – thư pháp Nguyệt Thư Ảnh, họ còn để lại một bức thư pháp, độc một chữ Trần, căn dặn con cháu sau này phải luôn nhìn đó mà học lẽ gia đình hòa hợp. Họ thực không ngờ rằng, chính nhờ lời dạy đó mà họ Trần hai trăm năm sau trở thành hoàng tộc đứng đầu cả nước Việt, mở ra triều đại hưng thịnh nhất trong một nghìn năm lịch sử phong kiến tự trị, ba lần đánh thắng đế chế Mông Nguyên đã từng thôn tính cả Trung Hoa rộng lớn ở phương Bắc.\r\n\r\nNhưng khoan hãy bàn về chiến công của người Đông A với quân Mông Nguyên, mà hãy nghe về con đường họ Trần dần chiếm lấy triều chính của họ Lý trước đã.”\r\n\r\n2. Lời thầy bói\r\n\r\n“- Ha ha ha. Đàn ông họ Trần sao lại không mỹ miều? – Lão thầy bói vừa cười lớn vừa bước ra, trước khi khuất bóng, lại nguây nguẩy cái đầu, đọc lớn câu thơ – “Phấn đại dương mi chiếu, yên hoa đối diện sinh. Tất dĩ nhan sắc đắc thiên hạ”.\r\n\r\nThủ Độ không biết chữ, nghe hoa hoa mây mây thì chẳng hiểu lão này ý nói gì. Còn Trần Thừa nghe tới câu “Tất dĩ nhan sắc đắc thiên hạ” thì nghĩ ngay tới người em gái thứ của mình là Trần Thị Dung, nổi tiếng xinh đẹp tuyệt trần. Lúc này đương kim thái tử là Lý Sảm do chạy giặc Quách Bốc mà phải trú thân ở chỗ Trần phủ. Thái tử Sảm lại đem lòng yêu mến nhan sắc của nhị nương, mà có ý lập nàng làm thái tử phi. Điều này khiến cả tộc họ Trần đắc ý lắm.\r\n\r\nKhi ấy, Trần Thừa cứ tưởng rằng, lão thầy bói muốn nói bóng nói gió em gái y sau này mê hoặc vua Lý, giúp nhà Trần đoạt thiên hạ. Nhưng nào có ngờ, thực chất ngụ ý của lão thầy bói lại là muốn ám chỉ nhị lang Trần Cảnh, con thứ của Trần Thừa, lúc bấy giờ còn chưa ra đời.\r\n\r\nCũng chẳng trách! Vì trước nay, phi tần mê hoặc hoàng đế, làm quốc gia tan vỡ thì có nhiều, chứ phò mã lấy lòng nữ đế, chấn hưng thời cuộc thì thực là chưa từng có.”\r\n\r\n3. Trần Cảnh diện kiến Lý Chiêu Hoàng\r\n\r\n“Cảnh hít vào một cái thật sâu, rồi lấy hết can đảm, ngước mặt lên.\r\n\r\nKhi hai mắt chạm nhau, y bần thần nhận ra nữ đế trông không hề giống Tiêu Diện tướng quân. Trái lại, nàng khoác bộ áo hoàng cổn nền đen, trên thêu nổi bằng chỉ vàng 12 chương gồm nhật, nguyệt, tinh, long, trĩ, sơn, tảo, hỏa, mễ, di, phủ, phất. Cổ đeo Phương tâm Khúc lĩnh bằng lụa trắng, bụng quấn đai vàng, đầu đội miện quan gắn 12 lưu, mỗi lưu xâu 12 hạt châu. Dáng vẻ oai phong lộng lẫy như mặt trăng trên trời cao, có thể thấy được mà không tài nào với tới được, thực không giống định nghĩa nữ nhi theo hiểu biết của y lắm.\r\n\r\nKhuôn dung của nàng mắt to mũi thanh, hai má ửng hồng, môi đỏ chúm chím, ẩn chứa vẻ ma lanh xảo quyệt. Nụ cười của nàng lại có gì đó thần kỳ, bí hiểm. Tóc nàng búi cao theo kiểu đàn ông. Y nhìn thấy giống con trai nhưng không phải con trai, cũng có nét nữ nhi con gái nhưng không hẳn ra con gái. Tổng quan lại thì vừa lấy làm tò mò, lại cũng có chút ngưỡng mộ.\r\n\r\nTuy là cùng tuổi, đều sinh vào năm Dần, nhưng nữ đế sinh trước y tận nửa năm. Khi đó y đã đem lòng tôn kính mà định tâm từ nay sẽ gọi nàng là “Hoàng Đế tỷ tỷ”.”\r\n\r\n4. Dĩ hổ đực trị hổ cái – Trần Thủ Độ:\r\n\r\n“Khi nữ đế đã khuất bóng, đám quan lại liền xôn xao như ong vỡ tổ. Cảnh còn chưa biết thế nào thì thúc phụ đã quay sang, mỉm cười nói với y:\r\n\r\n“Cháu của ta đi cả ngày chắc cũng đã thấm mệt rồi.”\r\n\r\nChưa đợi Cảnh đáp lại, Thủ Độ đã giằng cái tráp hầu mà Cảnh đang bưng, rồi đưa cho Liễu, ý bảo tự cầm lấy. Đoạn, y ẵm Cảnh lên tay, hãnh diện bước ra. Trần Thừa cũng bước liền theo cạnh đó, sắc mặt có chút băn khoăn.\r\n\r\nĐám quan lại khi nãy chẳng ngó ngàng gì tới nhị lang, nay lại ríu rít bám theo, bắt chuyện xởi lởi. Không những thế, bọn họ còn không dám đứng thẳng người, tránh để đầu họ cao hơn đầu đứa bé bảy tuổi, Trần Cảnh.\r\n\r\nCảnh còn chưa hiểu chuyện gì vừa xảy ra, nhưng trong lòng cũng hoan hỷ vì thấy mình đột nhiên oai phong ghê gớm. Y không biết rằng, trong bụng đám người lớn, ai ai cũng cùng một giuộc rằng từ chân phục dịch mà bước lên làm phò mã rồi hoàng đế, thực là chẳng xa lắm. Nữ đế Chiêu Hoàng kia thông minh, sắc sảo, tránh được Trần Liễu nhưng cuối cùng vẫn lọt vào cái bố trận mang tên Trần Cảnh của Thủ Độ rồi.\r\n\r\n“Thúc phụ, tại sao mọi người lại thay đổi thái độ như vậy?” – Cảnh hỏi thầm ông chú Thủ Độ.\r\n\r\n“Nữ đế tuổi cọp, con cũng tuổi cọp. Khi trước ta sắp xếp cho đại ca con vào ứng thí thực là hồ đồ quá. Trên đời này muốn trị cọp cái thì phải dùng cọp đực mới đúng chứ!””\r\n\r\n5. Ban khăn lụa\r\n\r\n“Cảnh về đến nhà, mệt rũ rượi, nằm vật ra giường không thiết ăn uống. Ông chú Thủ Độ thì đã sang nhà chờ y về từ lúc xẩm tối. Ông chú vừa nhìn thấy y là cứ bám riết theo, dò hỏi hôm nay có chuyện gì hay. Cảnh không muốn nói chuyện nhưng ông chú lại hỏi dai tận năm, sáu lần nên y đành uể oải kể lại. Vừa nghe xong, ông chú mặt mày hớn hở, háo hức đến hai má đỏ hồng cả lên, vừa đập bàn cái chát, vừa kết luận:\r\n\r\n- Nữ đế hắt nước vào người con là có dụ ý ban ‘nước’ Việt cho con đấy.”\r\n\r\n- Thúc phụ nói thế nào. Nếu Chiêu vương thực xem chậu nước là nước Việt thì đã không dám thò chân vào. – Cảnh cãi lại.\r\n\r\n- Con nói cũng đúng. Nhưng còn việc nữ đế ban khăn lụa ăn trầu cho con hẳn là có tình ý! Không chừng họ nhà ta sắp thành hoàng tộc rồi!”\r\n\r\n6. Tri kỷ thề bồi\r\n\r\n“Nói xong, nàng lại ôm bụng cười khanh khách. Cảnh không cười. Y bất ngờ vì phía sau vẻ ngoài hung hăng, Hoàng Đế tỷ tỷ tuy còn nhỏ tuổi mà lại có nhiều sầu não đến vậy. Y lại nhớ đến câu nói cửa miệng của ông chú, rằng một mai này y sẽ lấy Hoàng Đế tỷ tỷ, rồi lấy cả ngôi vị hoàng đế của nàng. Thời khắc ấy, y tự hạ quyết tâm, nếu quả thực việc đó có xảy ra, khi nào y còn làm hoàng đế, nhất định cũng sẽ không để kẻ nào hiếp đáp Hoàng Đế tỷ tỷ của y.\r\n\r\n- Này! Ngươi đang nghĩ gì mà mặt trầm tư vậy? – Hoàng Đế tỷ tỷ đưa tay lay vai y.\r\n\r\n- Trên đời này, hạ thần cũng sẽ chỉ cho một mình bệ hạ ăn hiếp. Những kẻ khác có muốn cũng không đụng được đến thần. Bởi vì… bởi vì… – Cảnh khởi đầu hùng hổ nhưng nói đến đây lại lắp bắp.\r\n\r\n- Bởi vì làm sao?\r\n\r\n- Bởi vì hạ thần xem bệ hạ là một người bạn chí thân.\r\n\r\nHoàng Đế tỷ tỷ vừa nghe xong thì phá lên cười. Nàng nói:\r\n\r\n- Ngươi chỉ là chính thủ, người thì vừa bé vừa còi như cây kỷ. Không có trẫm thì đám nô tài trong cung đã băm vằm ngươi thành trăm khúc rồi. Nhưng được lắm! Ngươi coi trẫm là bạn chí thân, thì trẫm cũng nhận ngươi làm tri kỷ!\r\n\r\n- Được! – Cảnh nhảy xuống ghế, chạy ra phía cửa sổ, nhìn lên trời mà nói – Trên có nguyệt lão chứng giám, Trần Cảnh ta thề rằng sẽ mãi mãi là tri kỷ của Hoàng Đế tỷ tỷ, có phúc cùng hưởng, có họa cùng chịu.\r\n\r\n- Được! Cho dù sinh ly tử biệt, cho dù ngàn trùng chia cắt, Chiêu Hoàng đế Lý Phật Kim trẫm cũng mãi là tri kỷ của Chính thủ Trần Cảnh đây!\r\n\r\nHai đứa trẻ lập lời thề rồi lại đưa ngón tay út ngoắc ngoắc vào nhau, cùng nhìn nhau cười khúc khích.”\r\n\r\n7. Mất ngôi báu\r\n\r\n“Trong quanh cảnh mờ nhòa đi bởi nước mắt ấy, nàng thấy loáng thoáng một đôi chân nhỏ xíu, chỉ bằng với chân của nàng, đang bước tới. Nàng ngước lên thì nhìn thấy Trần Cảnh đang đứng thẳng, cúi nhìn nàng nằm rạp dưới đất như nhìn một con kiến. Vị trí của nàng và Cảnh đã hoán đổi cho nhau tự lúc nào.\r\n\r\nCảnh vẫn im lặng. Y ngồi xổm xuống, định giúp Chiêu Hoàng nhặt lại những miếng ngọc vụn trên sàn, nhưng nàng liền hất tay y ra, rồi quát:\r\n\r\n“Thì ra đám các ngươi đã kéo bè lũ bày mưu với trẫm. Uổng công trẫm bấy lâu nay tin tưởng ngươi là người tri kỷ. Ngươi thực chất là kẻ tiểu nhân phản bạn!”\r\n\r\nCảnh cảm thấy thương cho Hoàng Đế tỷ tỷ, nhưng dù sao y vẫn là người họ Trần. Trong vũ trụ của y, người đứng cao nhất là cha ruột Trần Thừa, rồi đến thúc phụ Thủ Độ. Chỗ của người bạn kia, tuy là sâu thẳm trong tim, nhưng không thể đứng cao hơn các vị lão bối họ Trần.”\r\n\r\n8. Phu thê Trần - Lý\r\n\r\n“Đêm hôm sách phong hoàng hậu, Thái Tông đến cung Thiên Hinh của Chiêu Thánh nhưng nàng không còn nổi giận, lại càng không cười nói. Những việc xảy đến với cha mẹ nàng, với họ hàng thân thích khiến một đứa trẻ bình thường hoạt bát hiếu động, cũng phải ngã bệnh.\r\n\r\nThái Tông bước vào thấy Chiêu Thánh đang nằm bẹp trên giường, kéo chăn đến tận cằm. Sắc mặt nàng nhợt nhạt, đôi môi tím tái, đôi mắt lấp la lấp lánh khi xưa giờ vô hồn, nhìn chăm chăm lên trần nhà.\r\n\r\nThái Tông đến đứng bên cạnh giường nhưng nàng vẫn chẳng hề đếm xỉa, cứ như thể y là vô hình. Y vốn định nói nhiều điều với nàng, nhưng y còn chưa mở miệng thì nàng đã nói trước:\r\n\r\n“Ta muốn ở một mình!”\r\n\r\nThái Tông nghe vậy thì cũng không biết nói gì hơn, đành gật đầu rồi bước ra ngoài. Trước khi y khép cửa, thì lại nghe nàng nói:\r\n\r\n“Ta nhất định sẽ sống dai hơn ngươi, sống tốt hơn ngươi, làm được nhiều việc hơn ngươi!”\r\n\r\n“Nếu nàng muốn sống dai hơn trẫm, thì trước hết phải ăn cơm đã.”\r\n\r\nNói rồi y khép cửa lại.\r\n\r\nBên trong, Chiêu Thánh nghe nói thế, cũng tự dưng hừng hực đứng dậy, bước đến bàn ăn đã bày biện sẵn bao nhiêu món sơn hào hải vị. Bất chợt nàng chú ý đến một con hạc nhỏ, xếp từ giấy gấm hồng, nhìn xinh xắn vô cùng. Nàng xem kỹ thì thấy trong thân hạc có ghi chữ, liền mở ra đọc thử:\r\n\r\nAnh nọ quen thói tham ăn, đi ăn cỗ nhà ai thì chỉ biết cắm cúi nhét đầy mồm, chả thèm để ý đến những người xung quanh. Cô vợ ngượng lắm bảo:\r\n\r\n“Hôm nay sang nhà hàng xóm ăn cỗ, thầy nó ăn uống từ từ thôi.”\r\n\r\n“Tôi cũng muốn lắm, chỉ lại sợ không giữ được mồm miệng.” – anh chồng gãi tai.\r\n\r\n“Tôi đã có cách, tôi sẽ lấy sợi dây cột vào chân thầy nó, khi nào thấy tôi giật dây thì thầy nó hãy gắp.”\r\n\r\nVào tiệc mới đầu mọi chuyện diễn ra rất suôn sẻ. Lúc sau cô vợ nhìn lên thì thấy anh chồng cứ gắp lia gắp lịa thức ăn tống đầy mồm. Hoảng quá, cô vợ nhìn sợi dây thì mới biết có con gà đi qua bị vướng dây vào chân, nó gảy gảy cố gỡ ra nên mới tạo nên cơ sự như vậy.\r\n\r\nTruyện thì rõ ràng là truyện cười, nhưng Chiêu Thánh đọc xong lại không thấy buồn cười mà tự dưng khóc nấc lên.”\r\n\r\n9. Hiểu lầm\r\n\r\n“Chiêu Thánh không trả lời mà chỉ lắc đầu. Đoạn nàng vẫn lặng im mà ngả đầu vào lòng y, gân cốt mềm nhũn ra.\r\n\r\nTim trong ngực Thái Tông đập thình thịch. Khi nãy, nhờ cơn mưa bất chợt mà vài ý nghĩ dâm tà được gột rửa đi, nhưng nay lại chỉ còn hai người thì những ý nghĩ khi nãy lại bùng lên, còn mãnh liệt hơn. Y tự nhủ: “Hẳn là do tác dụng của Hồng Tình tán mà ả Nhi Khất lúc nãy nói tới. Ả nói đây là loại tình dược, có thể khiến người ta sổ ra mọi tâm tư trong lòng. Không lẽ tâm tư trong lòng nàng ấy đối với ta là…”\r\n\r\nVừa lúc ấy, Chiêu Thánh ngước đầu lên hỏi, giọng trìu mến khác hẳn khi thường:\r\n\r\n- Bệ hạ có phải là người bấy lâu nay luôn đặt hạc giấy vào trong tráp cơm của ta?\r\n\r\nThái Tông không hiểu hạc giấy trong tráp cơm nghĩa là gì. Mặc dù vậy, y cảm nhận rằng nếu bây giờ mà nói không, thì mãi mãi sẽ không kéo nàng lại gần mình được nữa. Y suy nghĩ một giây rồi đáp:\r\n\r\n- Nếu đúng là trẫm thì nàng định thế nào?\r\n\r\nChiêu Thánh mỉm cười. Lần đầu tiên Thái Tông thấy nàng cười nụ cười quyến rũ như vậy. Thế rồi, nàng quàng tay qua cổ y, ôm chầm lấy người mà nàng cho là đã luôn quan tâm, bỏ hạc giấy vào tráp cơm bấy lâu nay...”\r\n\r\n10. Chia ly\r\n\r\n“Thái Tông đưa đứa bé lên tận mặt, áp má vào vầng trán nhỏ, tự dưng lại cười nói:\r\n\r\n- Phải rồi, người ta vẫn nói đời cha ăn mặn, thì đời con khát nước. Nhưng mà Chiêu Thánh đâu có làm gì sai chứ.\r\n\r\nNói đến đây, y sực tỉnh ra. Một tay y vẫn bế đứa bé trên tay, hai chân guồng sức chạy thật nhanh, băng qua sân lạnh, vào trong gian điện đối diện, nhưng bên trong âm u lạnh lẽo, không một bóng người.\r\n\r\nVừa đến nơi thì thấy có bóng người leo lên lưng ngựa. Trong màn đêm đen tối, không trăng không sao, chẳng nhìn rõ mặt mũi người này, nhưng Thái Tông biết ngay rằng chính là Chiêu Thánh đây rồi, y liền gọi lớn:\r\n\r\n- Nàng định đi đâu?\r\n\r\nChiêu Thánh quay đầu lại, nhìn dáng hai cha con, trong lòng vừa yêu vừa hận. Nàng quát:\r\n\r\n- Con người ngươi rốt cục chỉ tóm lại bằng một chữ 忍(nhẫn). Khi bị nhát đao đâm vào tim mà vẫn trơ ra như không. Hẳn là vì trái tim ngươi làm bằng sắt đá.\r\n\r\nRồi nàng quay ngoắt, thúc ngựa phóng đi về phía Tây.”\r\n\r\nMã hàng\t8935069922166\r\nTên Nhà Cung Cấp\tPhụ Nữ\r\nTác giả\tBình Chi\r\nNXB\tPhụ Nữ Việt Nam\r\nNăm XB\t2023\r\nTrọng lượng (gr)\t551\r\nKích Thước Bao Bì\t23.5 x 15.5 x 1.9 cm\r\nSố trang\t404\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Tiểu thuyết bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nTrong chính sử, câu chuyện về Trần Cảnh – Lý Chiêu Hoàng là một trường hợp vô tiền khoáng hậu. Đó là cuộc chuyển giao vương quyền êm thuận nhất, ko tốn một giọt máu, giữa hai triều đại lớn của nước Việt, từ triều Lý với hơn 200 năm cai trị chuyển sang triều Trần kiêu dũng hùng cường. Nguyệt thư ảnh kiếm căn cứ từ những tư liệu lịch sử có thật, phóng tác lên thành một câu chuyện dã sử hấp dẫn, lãng mạn. Do không có con trai nối dõi, vua Lý Huệ Tông đã quyết định lập con gái thứ là Lý Phật Kim làm thái tử, sau đó lên ngôi lấy hiệu là Lý Chiêu Hoàng, trở thành vị nữ vương độc nhất của triều Lý. Lúc đó, với thế lực đang mạnh, tham vọng khôn cùng, thấy vua nữ còn nhỏ, nhà Lý suy yếu, Trần Thủ Độ mưu soán ngôi, bèn bố trí cháu mình là Trần Cảnh gần gũi hầu hạ tiểu nữ vương, từ đó ép nữ vương truyền ngôi cho nhà Trần, Trần Cảnh thành vua Trần Thái Tông. Đôi trẻ yêu nhau trong bối cảnh éo le, lúc tan lúc hợp, do chính trị luôn đứng giữa... Sau rất nhiều hiểu lầm, mất mát tổn thương, Trần Cảnh và Lý Chiêu Hoàng đứng trước mối họa xâm lăng từ quân Mông Nguyên, đã quyết gạt tình thù, đặt quốc gia lên trên hết. Nguyệt thư ảnh kiếm pháp vốn là uyên ương kiếm gia truyền của tộc Trần, đã trở thành vũ khí tiên phong cùng hào khí Đông A đánh tan quân giặc, hóa giải thù riêng giữa 2 dòng tộc hùng mạnh nhất trong lịch sử phong kiến Việt Nam.\r\n\r\nTác giả trẻ, có kiến văn tốt, yêu sử Việt. Khi đọc truyện, ngoài việc bị cuốn hút bởi tình tiết truyện, độc giả sẽ như được tiếp cận với các nhân vật vua chúa nhưng rất đỗi gần gũi, tưởng như người bằng xương bằng thịt, từ đó, giúp lịch sử dễ hiểu dễ cảm hơn. Sự thật chính sử được giữ nguyên, các nhân vật lịch sử như Trần Cảnh, Lý Chiêu Hoàng, Trần Thủ Độ, Trần Liễu, Trần Thị Dung, Ngột Lương Hợp Đài, Lê Phụ Trần... được khắc họa sáng tạo và thuyết phục ở góc nhìn trẻ trung lãng mạn. Tác giả lý giải lịch sử bằng sự đề cao sức mạnh tình cảm gia đình, tình huyết thống thiêng liêng. Thiên mệnh và nhân tình huyết mạch, những yếu tố đó tạo nên lòng tự tôn và sức mạnh hùng cường cho dân tộc, để cùng nhau đoàn kết chống ngoại xâm giữ yên bờ cõi, đồng thời xây dựng một đất nước phồn thịnh thời Lý – Trần.\r\n\r\nNhà xuất bản Phụ nữ VN trân trọng giới thiệu cùng bạn đọc.\r\n\r\nTác giả:\r\n\r\nBÌNH CHI\r\n\r\nTên thật: Nguyễn Thu Nga\r\n\r\nXem tiểu thuyết Kim Dung như một người bạn, và những triết lý Phật Giáo, triết lý Tình Yêu ẩn dưới những câu chuyện giang hồ trong truyện Kim Dung ảnh hưởng lớn đến lối viết của tác giả. Tác giả có thời gian dài học tập tại Nhật Bản và Anh quốc. Qua việc tiếp cận chữ Hán, học thư pháp, vẽ tranh thủy mặc, tác giả nhìn thấy được tình yêu của người Nhật và người Hoa với văn hóa của họ, nhờ đó mà lại càng khao khát muốn tìm về gốc rễ của mình, mong phần nào cắt nghĩa con người và văn hóa Việt Nam tự cổ chí kim. Vẽ lại những con người Việt, bằng chất liệu hội họa và văn học, trở thành đề tài mà tác giả theo đuổi.\r\n\r\nMột số trích đoạn hay:\r\n\r\n1. Kiếm pháp gia truyền “Nguyệt thư ảnh kiếm” của tộc Trần\r\n\r\n“Tập hết sáu mươi chiêu, hai người cùng mở mắt ra, thì đều không khỏi giật mình bởi đường kiếm của phu thê họ đã gom gió thành vũ bão, khiến cho năm sáu cây đào quanh đó run rẩy, trút xuống một cơn hồng đào hoa vũ, rực rỡ vô cùng.\r\n\r\nLão tổ tông cả mừng, hỏi:\r\n\r\n- Kiếm pháp của hai ta, không biết nên đặt tên là gì?”\r\n\r\n- Nhờ ánh trăng kia in bóng mình trên sân thành hình văn tự mà hai ta ngộ ra được. Hay đặt tên là Nguyệt Thư Ảnh kiếm pháp (月書影劍法)?\r\n\r\n... Thời gian cứ thế thấm thoát trôi qua. Hai vị tổ tông dù tài giỏi cách mấy cũng không tránh được số kiếp con người là sinh, lão, bệnh, tử. Khi mất đi, ngoài gia sản khổng lồ cùng với bộ kiếm – thư pháp Nguyệt Thư Ảnh, họ còn để lại một bức thư pháp, độc một chữ Trần, căn dặn con cháu sau này phải luôn nhìn đó mà học lẽ gia đình hòa hợp. Họ thực không ngờ rằng, chính nhờ lời dạy đó mà họ Trần hai trăm năm sau trở thành hoàng tộc đứng đầu cả nước Việt, mở ra triều đại hưng thịnh nhất trong một nghìn năm lịch sử phong kiến tự trị, ba lần đánh thắng đế chế Mông Nguyên đã từng thôn tính cả Trung Hoa rộng lớn ở phương Bắc.\r\n\r\nNhưng khoan hãy bàn về chiến công của người Đông A với quân Mông Nguyên, mà hãy nghe về con đường họ Trần dần chiếm lấy triều chính của họ Lý trước đã.”\r\n\r\n2. Lời thầy bói\r\n\r\n“- Ha ha ha. Đàn ông họ Trần sao lại không mỹ miều? – Lão thầy bói vừa cười lớn vừa bước ra, trước khi khuất bóng, lại nguây nguẩy cái đầu, đọc lớn câu thơ – “Phấn đại dương mi chiếu, yên hoa đối diện sinh. Tất dĩ nhan sắc đắc thiên hạ”.\r\n\r\nThủ Độ không biết chữ, nghe hoa hoa mây mây thì chẳng hiểu lão này ý nói gì. Còn Trần Thừa nghe tới câu “Tất dĩ nhan sắc đắc thiên hạ” thì nghĩ ngay tới người em gái thứ của mình là Trần Thị Dung, nổi tiếng xinh đẹp tuyệt trần. Lúc này đương kim thái tử là Lý Sảm do chạy giặc Quách Bốc mà phải trú thân ở chỗ Trần phủ. Thái tử Sảm lại đem lòng yêu mến nhan sắc của nhị nương, mà có ý lập nàng làm thái tử phi. Điều này khiến cả tộc họ Trần đắc ý lắm.\r\n\r\nKhi ấy, Trần Thừa cứ tưởng rằng, lão thầy bói muốn nói bóng nói gió em gái y sau này mê hoặc vua Lý, giúp nhà Trần đoạt thiên hạ. Nhưng nào có ngờ, thực chất ngụ ý của lão thầy bói lại là muốn ám chỉ nhị lang Trần Cảnh, con thứ của Trần Thừa, lúc bấy giờ còn chưa ra đời.\r\n\r\nCũng chẳng trách! Vì trước nay, phi tần mê hoặc hoàng đế, làm quốc gia tan vỡ thì có nhiều, chứ phò mã lấy lòng nữ đế, chấn hưng thời cuộc thì thực là chưa từng có.”\r\n\r\n3. Trần Cảnh diện kiến Lý Chiêu Hoàng\r\n\r\n“Cảnh hít vào một cái thật sâu, rồi lấy hết can đảm, ngước mặt lên.\r\n\r\nKhi hai mắt chạm nhau, y bần thần nhận ra nữ đế trông không hề giống Tiêu Diện tướng quân. Trái lại, nàng khoác bộ áo hoàng cổn nền đen, trên thêu nổi bằng chỉ vàng 12 chương gồm nhật, nguyệt, tinh, long, trĩ, sơn, tảo, hỏa, mễ, di, phủ, phất. Cổ đeo Phương tâm Khúc lĩnh bằng lụa trắng, bụng quấn đai vàng, đầu đội miện quan gắn 12 lưu, mỗi lưu xâu 12 hạt châu. Dáng vẻ oai phong lộng lẫy như mặt trăng trên trời cao, có thể thấy được mà không tài nào với tới được, thực không giống định nghĩa nữ nhi theo hiểu biết của y lắm.\r\n\r\nKhuôn dung của nàng mắt to mũi thanh, hai má ửng hồng, môi đỏ chúm chím, ẩn chứa vẻ ma lanh xảo quyệt. Nụ cười của nàng lại có gì đó thần kỳ, bí hiểm. Tóc nàng búi cao theo kiểu đàn ông. Y nhìn thấy giống con trai nhưng không phải con trai, cũng có nét nữ nhi con gái nhưng không hẳn ra con gái. Tổng quan lại thì vừa lấy làm tò mò, lại cũng có chút ngưỡng mộ.\r\n\r\nTuy là cùng tuổi, đều sinh vào năm Dần, nhưng nữ đế sinh trước y tận nửa năm. Khi đó y đã đem lòng tôn kính mà định tâm từ nay sẽ gọi nàng là “Hoàng Đế tỷ tỷ”.”\r\n\r\n4. Dĩ hổ đực trị hổ cái – Trần Thủ Độ:\r\n\r\n“Khi nữ đế đã khuất bóng, đám quan lại liền xôn xao như ong vỡ tổ. Cảnh còn chưa biết thế nào thì thúc phụ đã quay sang, mỉm cười nói với y:\r\n\r\n“Cháu của ta đi cả ngày chắc cũng đã thấm mệt rồi.”\r\n\r\nChưa đợi Cảnh đáp lại, Thủ Độ đã giằng cái tráp hầu mà Cảnh đang bưng, rồi đưa cho Liễu, ý bảo tự cầm lấy. Đoạn, y ẵm Cảnh lên tay, hãnh diện bước ra. Trần Thừa cũng bước liền theo cạnh đó, sắc mặt có chút băn khoăn.\r\n\r\nĐám quan lại khi nãy chẳng ngó ngàng gì tới nhị lang, nay lại ríu rít bám theo, bắt chuyện xởi lởi. Không những thế, bọn họ còn không dám đứng thẳng người, tránh để đầu họ cao hơn đầu đứa bé bảy tuổi, Trần Cảnh.\r\n\r\nCảnh còn chưa hiểu chuyện gì vừa xảy ra, nhưng trong lòng cũng hoan hỷ vì thấy mình đột nhiên oai phong ghê gớm. Y không biết rằng, trong bụng đám người lớn, ai ai cũng cùng một giuộc rằng từ chân phục dịch mà bước lên làm phò mã rồi hoàng đế, thực là chẳng xa lắm. Nữ đế Chiêu Hoàng kia thông minh, sắc sảo, tránh được Trần Liễu nhưng cuối cùng vẫn lọt vào cái bố trận mang tên Trần Cảnh của Thủ Độ rồi.\r\n\r\n“Thúc phụ, tại sao mọi người lại thay đổi thái độ như vậy?” – Cảnh hỏi thầm ông chú Thủ Độ.\r\n\r\n“Nữ đế tuổi cọp, con cũng tuổi cọp. Khi trước ta sắp xếp cho đại ca con vào ứng thí thực là hồ đồ quá. Trên đời này muốn trị cọp cái thì phải dùng cọp đực mới đúng chứ!””\r\n\r\n5. Ban khăn lụa\r\n\r\n“Cảnh về đến nhà, mệt rũ rượi, nằm vật ra giường không thiết ăn uống. Ông chú Thủ Độ thì đã sang nhà chờ y về từ lúc xẩm tối. Ông chú vừa nhìn thấy y là cứ bám riết theo, dò hỏi hôm nay có chuyện gì hay. Cảnh không muốn nói chuyện nhưng ông chú lại hỏi dai tận năm, sáu lần nên y đành uể oải kể lại. Vừa nghe xong, ông chú mặt mày hớn hở, háo hức đến hai má đỏ hồng cả lên, vừa đập bàn cái chát, vừa kết luận:\r\n\r\n- Nữ đế hắt nước vào người con là có dụ ý ban ‘nước’ Việt cho con đấy.”\r\n\r\n- Thúc phụ nói thế nào. Nếu Chiêu vương thực xem chậu nước là nước Việt thì đã không dám thò chân vào. – Cảnh cãi lại.\r\n\r\n- Con nói cũng đúng. Nhưng còn việc nữ đế ban khăn lụa ăn trầu cho con hẳn là có tình ý! Không chừng họ nhà ta sắp thành hoàng tộc rồi!”\r\n\r\n6. Tri kỷ thề bồi\r\n\r\n“Nói xong, nàng lại ôm bụng cười khanh khách. Cảnh không cười. Y bất ngờ vì phía sau vẻ ngoài hung hăng, Hoàng Đế tỷ tỷ tuy còn nhỏ tuổi mà lại có nhiều sầu não đến vậy. Y lại nhớ đến câu nói cửa miệng của ông chú, rằng một mai này y sẽ lấy Hoàng Đế tỷ tỷ, rồi lấy cả ngôi vị hoàng đế của nàng. Thời khắc ấy, y tự hạ quyết tâm, nếu quả thực việc đó có xảy ra, khi nào y còn làm hoàng đế, nhất định cũng sẽ không để kẻ nào hiếp đáp Hoàng Đế tỷ tỷ của y.\r\n\r\n- Này! Ngươi đang nghĩ gì mà mặt trầm tư vậy? – Hoàng Đế tỷ tỷ đưa tay lay vai y.\r\n\r\n- Trên đời này, hạ thần cũng sẽ chỉ cho một mình bệ hạ ăn hiếp. Những kẻ khác có muốn cũng không đụng được đến thần. Bởi vì… bởi vì… – Cảnh khởi đầu hùng hổ nhưng nói đến đây lại lắp bắp.\r\n\r\n- Bởi vì làm sao?\r\n\r\n- Bởi vì hạ thần xem bệ hạ là một người bạn chí thân.\r\n\r\nHoàng Đế tỷ tỷ vừa nghe xong thì phá lên cười. Nàng nói:\r\n\r\n- Ngươi chỉ là chính thủ, người thì vừa bé vừa còi như cây kỷ. Không có trẫm thì đám nô tài trong cung đã băm vằm ngươi thành trăm khúc rồi. Nhưng được lắm! Ngươi coi trẫm là bạn chí thân, thì trẫm cũng nhận ngươi làm tri kỷ!\r\n\r\n- Được! – Cảnh nhảy xuống ghế, chạy ra phía cửa sổ, nhìn lên trời mà nói – Trên có nguyệt lão chứng giám, Trần Cảnh ta thề rằng sẽ mãi mãi là tri kỷ của Hoàng Đế tỷ tỷ, có phúc cùng hưởng, có họa cùng chịu.\r\n\r\n- Được! Cho dù sinh ly tử biệt, cho dù ngàn trùng chia cắt, Chiêu Hoàng đế Lý Phật Kim trẫm cũng mãi là tri kỷ của Chính thủ Trần Cảnh đây!\r\n\r\nHai đứa trẻ lập lời thề rồi lại đưa ngón tay út ngoắc ngoắc vào nhau, cùng nhìn nhau cười khúc khích.”\r\n\r\n7. Mất ngôi báu\r\n\r\n“Trong quanh cảnh mờ nhòa đi bởi nước mắt ấy, nàng thấy loáng thoáng một đôi chân nhỏ xíu, chỉ bằng với chân của nàng, đang bước tới. Nàng ngước lên thì nhìn thấy Trần Cảnh đang đứng thẳng, cúi nhìn nàng nằm rạp dưới đất như nhìn một con kiến. Vị trí của nàng và Cảnh đã hoán đổi cho nhau tự lúc nào.\r\n\r\nCảnh vẫn im lặng. Y ngồi xổm xuống, định giúp Chiêu Hoàng nhặt lại những miếng ngọc vụn trên sàn, nhưng nàng liền hất tay y ra, rồi quát:\r\n\r\n“Thì ra đám các ngươi đã kéo bè lũ bày mưu với trẫm. Uổng công trẫm bấy lâu nay tin tưởng ngươi là người tri kỷ. Ngươi thực chất là kẻ tiểu nhân phản bạn!”\r\n\r\nCảnh cảm thấy thương cho Hoàng Đế tỷ tỷ, nhưng dù sao y vẫn là người họ Trần. Trong vũ trụ của y, người đứng cao nhất là cha ruột Trần Thừa, rồi đến thúc phụ Thủ Độ. Chỗ của người bạn kia, tuy là sâu thẳm trong tim, nhưng không thể đứng cao hơn các vị lão bối họ Trần.”\r\n\r\n8. Phu thê Trần - Lý\r\n\r\n“Đêm hôm sách phong hoàng hậu, Thái Tông đến cung Thiên Hinh của Chiêu Thánh nhưng nàng không còn nổi giận, lại càng không cười nói. Những việc xảy đến với cha mẹ nàng, với họ hàng thân thích khiến một đứa trẻ bình thường hoạt bát hiếu động, cũng phải ngã bệnh.\r\n\r\nThái Tông bước vào thấy Chiêu Thánh đang nằm bẹp trên giường, kéo chăn đến tận cằm. Sắc mặt nàng nhợt nhạt, đôi môi tím tái, đôi mắt lấp la lấp lánh khi xưa giờ vô hồn, nhìn chăm chăm lên trần nhà.\r\n\r\nThái Tông đến đứng bên cạnh giường nhưng nàng vẫn chẳng hề đếm xỉa, cứ như thể y là vô hình. Y vốn định nói nhiều điều với nàng, nhưng y còn chưa mở miệng thì nàng đã nói trước:\r\n\r\n“Ta muốn ở một mình!”\r\n\r\nThái Tông nghe vậy thì cũng không biết nói gì hơn, đành gật đầu rồi bước ra ngoài. Trước khi y khép cửa, thì lại nghe nàng nói:\r\n\r\n“Ta nhất định sẽ sống dai hơn ngươi, sống tốt hơn ngươi, làm được nhiều việc hơn ngươi!”\r\n\r\n“Nếu nàng muốn sống dai hơn trẫm, thì trước hết phải ăn cơm đã.”\r\n\r\nNói rồi y khép cửa lại.\r\n\r\nBên trong, Chiêu Thánh nghe nói thế, cũng tự dưng hừng hực đứng dậy, bước đến bàn ăn đã bày biện sẵn bao nhiêu món sơn hào hải vị. Bất chợt nàng chú ý đến một con hạc nhỏ, xếp từ giấy gấm hồng, nhìn xinh xắn vô cùng. Nàng xem kỹ thì thấy trong thân hạc có ghi chữ, liền mở ra đọc thử:\r\n\r\nAnh nọ quen thói tham ăn, đi ăn cỗ nhà ai thì chỉ biết cắm cúi nhét đầy mồm, chả thèm để ý đến những người xung quanh. Cô vợ ngượng lắm bảo:\r\n\r\n“Hôm nay sang nhà hàng xóm ăn cỗ, thầy nó ăn uống từ từ thôi.”\r\n\r\n“Tôi cũng muốn lắm, chỉ lại sợ không giữ được mồm miệng.” – anh chồng gãi tai.\r\n\r\n“Tôi đã có cách, tôi sẽ lấy sợi dây cột vào chân thầy nó, khi nào thấy tôi giật dây thì thầy nó hãy gắp.”\r\n\r\nVào tiệc mới đầu mọi chuyện diễn ra rất suôn sẻ. Lúc sau cô vợ nhìn lên thì thấy anh chồng cứ gắp lia gắp lịa thức ăn tống đầy mồm. Hoảng quá, cô vợ nhìn sợi dây thì mới biết có con gà đi qua bị vướng dây vào chân, nó gảy gảy cố gỡ ra nên mới tạo nên cơ sự như vậy.\r\n\r\nTruyện thì rõ ràng là truyện cười, nhưng Chiêu Thánh đọc xong lại không thấy buồn cười mà tự dưng khóc nấc lên.”\r\n\r\n9. Hiểu lầm\r\n\r\n“Chiêu Thánh không trả lời mà chỉ lắc đầu. Đoạn nàng vẫn lặng im mà ngả đầu vào lòng y, gân cốt mềm nhũn ra.\r\n\r\nTim trong ngực Thái Tông đập thình thịch. Khi nãy, nhờ cơn mưa bất chợt mà vài ý nghĩ dâm tà được gột rửa đi, nhưng nay lại chỉ còn hai người thì những ý nghĩ khi nãy lại bùng lên, còn mãnh liệt hơn. Y tự nhủ: “Hẳn là do tác dụng của Hồng Tình tán mà ả Nhi Khất lúc nãy nói tới. Ả nói đây là loại tình dược, có thể khiến người ta sổ ra mọi tâm tư trong lòng. Không lẽ tâm tư trong lòng nàng ấy đối với ta là…”\r\n\r\nVừa lúc ấy, Chiêu Thánh ngước đầu lên hỏi, giọng trìu mến khác hẳn khi thường:\r\n\r\n- Bệ hạ có phải là người bấy lâu nay luôn đặt hạc giấy vào trong tráp cơm của ta?\r\n\r\nThái Tông không hiểu hạc giấy trong tráp cơm nghĩa là gì. Mặc dù vậy, y cảm nhận rằng nếu bây giờ mà nói không, thì mãi mãi sẽ không kéo nàng lại gần mình được nữa. Y suy nghĩ một giây rồi đáp:\r\n\r\n- Nếu đúng là trẫm thì nàng định thế nào?\r\n\r\nChiêu Thánh mỉm cười. Lần đầu tiên Thái Tông thấy nàng cười nụ cười quyến rũ như vậy. Thế rồi, nàng quàng tay qua cổ y, ôm chầm lấy người mà nàng cho là đã luôn quan tâm, bỏ hạc giấy vào tráp cơm bấy lâu nay...”\r\n\r\n10. Chia ly\r\n\r\n“Thái Tông đưa đứa bé lên tận mặt, áp má vào vầng trán nhỏ, tự dưng lại cười nói:\r\n\r\n- Phải rồi, người ta vẫn nói đời cha ăn mặn, thì đời con khát nước. Nhưng mà Chiêu Thánh đâu có làm gì sai chứ.\r\n\r\nNói đến đây, y sực tỉnh ra. Một tay y vẫn bế đứa bé trên tay, hai chân guồng sức chạy thật nhanh, băng qua sân lạnh, vào trong gian điện đối diện, nhưng bên trong âm u lạnh lẽo, không một bóng người.\r\n\r\nVừa đến nơi thì thấy có bóng người leo lên lưng ngựa. Trong màn đêm đen tối, không trăng không sao, chẳng nhìn rõ mặt mũi người này, nhưng Thái Tông biết ngay rằng chính là Chiêu Thánh đây rồi, y liền gọi lớn:\r\n\r\n- Nàng định đi đâu?\r\n\r\nChiêu Thánh quay đầu lại, nhìn dáng hai cha con, trong lòng vừa yêu vừa hận. Nàng quát:\r\n\r\n- Con người ngươi rốt cục chỉ tóm lại bằng một chữ 忍(nhẫn). Khi bị nhát đao đâm vào tim mà vẫn trơ ra như không. Hẳn là vì trái tim ngươi làm bằng sắt đá.\r\n\r\nRồi nàng quay ngoắt, thúc ngựa phóng đi về phía Tây.”",
        "public": true,
        "publish_date": "2022",
        "author": "Bình Chi",
        "amount": 404,
        "number_of_page": 404,
        "sold": 1,
        "rating": 5,
        "price": 129000,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/n/g/nguyetthuanhkiem.jpg",
        "slug": "nguyet-thu-anh-kiem",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 9,
            "name": "TIỂU THUYẾT",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-09T13:55:04.228Z"
        },
        "images": []
    },
    {
        "id": 279,
        "name": "Làm Đĩ",
        "description": "Làm đĩ là một thiên tả chân tiểu thuyết mục đích là hô hào nhà đạo đức và bậc làm cha mẹ lo chăm đến hạnh phúc của con cái và phải để ý đến cái sự mà những thành kiến hủ bại vẫn coi là điều bẩn thỉu, tức là cái sự dâm.\r\n\r\nSở dĩ tác giả không theo phải người ưa văn hoá bay bướm gọi cái sự ấy là ái tình, không theo hạng người rụt rè gọi là tình dục, nhưng lại gọi nó ra đây bằng cái tên tục của nó, ấy là vì tác giả có quan niệm rất chắc chắn rằng cái sự ấy gần xác thịt hơn là gần linh hồn, chia nó ra làm hai cũng được, gồm nó vào làm một lại càng đúng lẽ sinh lý, hai cái điều hoà tương trợ lẫn nhau, và khi sự khao khát của xác thịt có thoả mãn thì ái tình tinh thần mới bền chặt được. Nói đến ái tình lý tưởng mà không đếm xỉa đến cái dâm, đó chỉ là việc của hạng mơ mộng hão huyền.\r\n\r\nLàm đĩ không tả lối sống của gái giang hồ mà chỉ vạch lại cái cảnh ngộ đã làm cho Huyền cô gái con nhà tử tế xinh đẹp, có học, thông minh phải sa chân, lỡ bước vào cuộc đời truỵ lạc. Làm đĩ là tiểu thuyết hiện thực đã không ngần ngại đặt ra một vấn đề: Tại sao lại có người phải Làm đĩ, xã hội có nạn mại dâm? Chính tác giả trong \"Đoạn cuối\" sách đã nói rõ ra với nhân vật chính của mình: \"Đối với thiên hạ thì đời một người như em, đương ở chốn yên lành mà vào nơi chông gai, chỉ có đoạn ấy là đáng nói thôi. Tại sao con nhà tử tế hẳn hoi, con nhà quý phái nữa, mà rồi đến nỗi…. trụy lạc, ấy người đời chỉ cần biết rõ những nguyên nhân ấy…\"\r\n\r\nMã hàng\t8935088549719\r\nTên Nhà Cung Cấp\tCty Văn Hóa Minh Lâm\r\nTác giả\tVũ Trọng Phụng\r\nNXB\tNXB Văn Học\r\nNăm XB\t2016\r\nTrọng lượng (gr)\t203\r\nKích Thước Bao Bì\t20.5 x 13.5 x 1.3 cm\r\nSố trang\t216\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Tiểu thuyết bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nLàm đĩ là một thiên tả chân tiểu thuyết mục đích là hô hào nhà đạo đức và bậc làm cha mẹ lo chăm đến hạnh phúc của con cái và phải để ý đến cái sự mà những thành kiến hủ bại vẫn coi là điều bẩn thỉu, tức là cái sự dâm.\r\n\r\nSở dĩ tác giả không theo phải người ưa văn hoá bay bướm gọi cái sự ấy là ái tình, không theo hạng người rụt rè gọi là tình dục, nhưng lại gọi nó ra đây bằng cái tên tục của nó, ấy là vì tác giả có quan niệm rất chắc chắn rằng cái sự ấy gần xác thịt hơn là gần linh hồn, chia nó ra làm hai cũng được, gồm nó vào làm một lại càng đúng lẽ sinh lý, hai cái điều hoà tương trợ lẫn nhau, và khi sự khao khát của xác thịt có thoả mãn thì ái tình tinh thần mới bền chặt được. Nói đến ái tình lý tưởng mà không đếm xỉa đến cái dâm, đó chỉ là việc của hạng mơ mộng hão huyền.\r\n\r\nLàm đĩ không tả lối sống của gái giang hồ mà chỉ vạch lại cái cảnh ngộ đã làm cho Huyền cô gái con nhà tử tế xinh đẹp, có học, thông minh phải sa chân, lỡ bước vào cuộc đời truỵ lạc. Làm đĩ là tiểu thuyết hiện thực đã không ngần ngại đặt ra một vấn đề: Tại sao lại có người phải Làm đĩ, xã hội có nạn mại dâm? Chính tác giả trong \"Đoạn cuối\" sách đã nói rõ ra với nhân vật chính của mình: \"Đối với thiên hạ thì đời một người như em, đương ở chốn yên lành mà vào nơi chông gai, chỉ có đoạn ấy là đáng nói thôi. Tại sao con nhà tử tế hẳn hoi, con nhà quý phái nữa, mà rồi đến nỗi…. trụy lạc, ấy người đời chỉ cần biết rõ những nguyên nhân ấy…\"",
        "public": true,
        "publish_date": "2020",
        "author": "Vũ Trọng Phụng",
        "amount": 216,
        "number_of_page": 216,
        "sold": 37,
        "rating": 5,
        "price": 49300,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_35391.jpg",
        "slug": "lam-di",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-10T03:47:46.703Z",
        "category": {
            "id": 9,
            "name": "TIỂU THUYẾT",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-09T13:55:04.228Z"
        },
        "images": []
    },
    {
        "id": 280,
        "name": "Đỗ Thích Kỳ Án",
        "description": "Đỗ Thích Kỳ Án\r\n\r\nSáng tác của cây bút Phan Khánh có khuynh hướng chuyên sâu về lịch sử. Đặc điểm này phản ánh ưu thế trội trong học vấn, tài năng, tính cách của ông. Thông thạo lịch sử, giàu có về ngôn ngữ, minh triết về tư duy, ưa thích khám phá chiều sâu hiện thực và có một trí nhớ siêu thường đáng được gọi là cường ký, Phan Khánh thật sự đẫ thể hiện những đặc điểm trội bật đó trong cuốn sách này của ông: Đỗ Thích Kỳ Án\r\n\r\nĐỗ Thích là kẻ đã giết hai cha con vua Đinh Tiên Hoàng năm Kỷ Mão ( 979). Và Pha Khánh không phải là người đầu tiên viết về kỳ án này. Có điều là, trong khi để tâm nghiên cứu, lặn lội vào chiều rộng và bể sâu của sự việc, với phong cách riêng của mình, ông không chịu dừng lại ở bề ngoài của hiện thực, không thỏa mãn với những gì người trước đã viết mà ông cho là phi logic, quá dễ dãi, đặc biệt là trong quá trình mô tả tội phạm, nạn nhân, địa điểm, lý do xảy ra vụ án.\r\n\r\nTrăn trở trước sự kiện chấn động lịch sử này, Phan Khánh đã cất công tìm hiểu thêm Việt Sử lược, Tống sử Giao Châu truyện cùng nhiều tài liệu văn bản khác, để từ đó và cuối cùng trình bày, miêu tả lại sự kiện, với mục đích chân thành là góp một tiếng nói nhằm khôi phục lại sự thật lịch sử như nó vốn có. \r\n\r\nĐặt cuốn sách vào thể loại dã sử, nhưng tất cả, từ cốt truyện đến tên tuổi nhân vật cũng như âm mưu vàh ành động xâm lược nước ta của nhà Nam Hán và nhà Tống trong cuốn sách này, bạn đọc sẽ thấy đều có căn cứ từ trong sách sử chính thống và hợp với logic lịch sử. Cũng là hợp với logic lịch sử và cuộc sống, theo thiển nghĩ, khi tác giả lý giải nhân vật Đỗ Thích chính là gián điệp nhà Tống và Quận công Nguyễn Bặc, lãnh chức Điện tiền chỉ huy sứ, người chịu trách nhiệm chính về vụ án đã không bắt được Đỗ Thích nên vội vàng hủy bỏ nhân chứng giả.\r\n\r\nMã hàng\t9786045871485\r\nNhà Cung Cấp\tNXB Tổng Hợp TPHCM\r\nTác giả\tPhan Khánh\r\nNXB\tNXB Tổng Hợp TPHCM\r\nNăm XB\t2018\r\nTrọng lượng (gr)\t350\r\nKích Thước Bao Bì\t14.5 x 20.5\r\nSố trang\t312\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Tiểu thuyết bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nĐỗ Thích Kỳ Án\r\n\r\nSáng tác của cây bút Phan Khánh có khuynh hướng chuyên sâu về lịch sử. Đặc điểm này phản ánh ưu thế trội trong học vấn, tài năng, tính cách của ông. Thông thạo lịch sử, giàu có về ngôn ngữ, minh triết về tư duy, ưa thích khám phá chiều sâu hiện thực và có một trí nhớ siêu thường đáng được gọi là cường ký, Phan Khánh thật sự đẫ thể hiện những đặc điểm trội bật đó trong cuốn sách này của ông: Đỗ Thích Kỳ Án\r\n\r\nĐỗ Thích là kẻ đã giết hai cha con vua Đinh Tiên Hoàng năm Kỷ Mão ( 979). Và Pha Khánh không phải là người đầu tiên viết về kỳ án này. Có điều là, trong khi để tâm nghiên cứu, lặn lội vào chiều rộng và bể sâu của sự việc, với phong cách riêng của mình, ông không chịu dừng lại ở bề ngoài của hiện thực, không thỏa mãn với những gì người trước đã viết mà ông cho là phi logic, quá dễ dãi, đặc biệt là trong quá trình mô tả tội phạm, nạn nhân, địa điểm, lý do xảy ra vụ án.\r\n\r\nTrăn trở trước sự kiện chấn động lịch sử này, Phan Khánh đã cất công tìm hiểu thêm Việt Sử lược, Tống sử Giao Châu truyện cùng nhiều tài liệu văn bản khác, để từ đó và cuối cùng trình bày, miêu tả lại sự kiện, với mục đích chân thành là góp một tiếng nói nhằm khôi phục lại sự thật lịch sử như nó vốn có. \r\n\r\nĐặt cuốn sách vào thể loại dã sử, nhưng tất cả, từ cốt truyện đến tên tuổi nhân vật cũng như âm mưu vàh ành động xâm lược nước ta của nhà Nam Hán và nhà Tống trong cuốn sách này, bạn đọc sẽ thấy đều có căn cứ từ trong sách sử chính thống và hợp với logic lịch sử. Cũng là hợp với logic lịch sử và cuộc sống, theo thiển nghĩ, khi tác giả lý giải nhân vật Đỗ Thích chính là gián điệp nhà Tống và Quận công Nguyễn Bặc, lãnh chức Điện tiền chỉ huy sứ, người chịu trách nhiệm chính về vụ án đã không bắt được Đỗ Thích nên vội vàng hủy bỏ nhân chứng giả.",
        "public": true,
        "publish_date": "2019",
        "author": "Phan Khánh",
        "amount": 312,
        "number_of_page": 312,
        "sold": 1,
        "rating": 5,
        "price": 102000,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/i/m/image_171969.jpg",
        "slug": "do-thich-ky-an",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 9,
            "name": "TIỂU THUYẾT",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-09T13:55:04.228Z"
        },
        "images": []
    },
    {
        "id": 281,
        "name": "Vợ Người Tình Và Quý Ông Hoàn Hảo",
        "description": "Hẳn với các độc giả yêu văn học Nga, cái tên Maria Metlitskaya không còn quá xa lạ. Sâu cay và hóm hỉnh, nữ văn sĩ xứ Bạch Dương đã từng khiến chúng ta không khỏi ôm bụng ngặt nghẽo trước những trận chiến bi hài không hồi kết giữa mẹ chồng và nàng dâu trong cuốn tiểu thuyết vui nhộn Nhật kí mẹ chồng. Và trong suốt một thời gian dài, Nhật kí mẹ chồng gần như trở thành một thứ bảo bối cho bất kì ai đang có ý định “láng cháng” đến gần với cánh cửa hôn nhân.\r\n\r\nTuy nhiên, đã bao giờ bạn tò mò muốn biết thêm về một Maria Metlitskaya mới, thâm trầm và sâu sắc hơn? Vậy thì sau Nhật kí mẹ chồng, hãy thử tìm đến bà qua tác phẩm mới đầy tính nhân văn, Vợ, người tình và quý ông hoàn hảo.\r\n\r\nVợ, người tình và quý ông hoàn hảo xoay quanh cuộc đời Nadya – một người phụ nữ tưởng như đã được số phận đối đãi hậu hĩnh khi ban cho một người chồng học thức, thành đạt; một cô con gái xinh đẹp ở nước ngoài và một cuộc sống đủ đầy, không phải lo toan cơm áo như bao người đàn bà khác. Thế nhưng sự hoàn hảo đó chỉ là vẻ bề ngoài, chẳng một ai biết được chị đã cô đơn nhường nào bên những người ruột thịt trong chính tổ ấm mà mình vẫn vun vén hằng ngày. Và cái ngày người chồng mà chị tôn thờ như Chúa sống nằm xuống, ngỡ như rằng từ đây chị đã có thể nhẹ nhõm sống đời riêng mình, nhưng hóa ra, đó lại là cú nốc ao mà người chồng chung thủy dành tặng cho người vợ tận tụy bao năm của mình. Nadya tình cờ phát hiện ra chồng chị có một cuộc đời bí mật. Một cuộc đời ngồn ngộn sự kiện, trải nghiệm và đồng cảm về một người đàn bà khác. Ngoài vợ mình.\r\n\r\n“Đến đấy bỗng một ý nghĩ xuyên thấu tim chị – vậy là họ đã sống cả đời như người lạ. Hoàn toàn xa lạ! Người ta còn biết nhiều hơn về láng giềng cạnh căn hộ mình hay người đồng hành trên xe lửa. Còn anh chưa từng buồn lo cho chị, chị cũng chưa từng hiểu hết về anh. Thật là kinh tởm!”\r\n\r\nKhông hề có những trường đoạn mô tả nhục cảm, không một lần Nadya tận mắt chứng kiến cảnh chồng mình bên nhân tình; thế nhưng Maria Metlitskaya, hơn ai hết có thể thấu tỏ những thấm buốt của người vợ khi vỡ lẽ ra cuộc hôn nhân của họ hóa ra chỉ là “sự lựa chọn đúng đắn” của chồng và chị rốt cuộc vẫn chỉ là người đàn bà nhòm trộm cuộc sống riêng tư của chồng qua lỗ khóa. Người chồng ấy đã nợ vợ mình cả cuộc đời. Nhưng chua xót thay, ông ta lại xem đó là cái giá đương nhiên sau khi đã đem đến cho vợ sự đủ đầy vật chất.\r\n\r\nĐến với Vợ, người tình và quý ông hoàn hảo, ta như cảm nhận thấy một cuộc rượt đuổi tình cảm liên tu bất tận giữa người chồng, người vợ và cô nhân tình. Cả ba đều chấp chới, vô vọng hướng về ảo ảnh trái ngang để rồi rốt cuộc tự làm chính mình mệt nhoài trong thế sự cuộc đời, trong tình yêu biến ảo, và trong dục vọng tham lam.\r\n\r\nKhông còn là một Metlitskaya hài hước trong Nhật kí mẹ chồng, nữ nhà văn tài năng của nước Nga đã đặt ra trong tác phẩm mới của mình những vấn đề nghiêm túc về tâm lý, đạo đức xã hội mà mỗi chúng ta đều phải đối mặt và suy ngẫm trong cuộc sống “để không bị nợ nần, cả về đạo đức lẫn tâm hồn. Để tự do với lương tâm thanh thản”. Bà đã gióng lên một hồi chuông cảnh báo về sự biến chất của những gì sâu xa nhất, thiêng liêng nhất khi người ta nhân danh tình yêu để tự cho phép mình hủy hoại một cuộc đời khác và những oái oăm, ngang trái mà những người lương thiện phải gánh chịu.\r\n\r\nNhà xuất bản Phụ nữ xin gửi đến các độc giả những trang văn chất chứa cảm xúc về một trong những vấn đề nhạy cảm nhất của cuộc sống hôn nhân thời hiện đại vào mùa thu năm 2018.\r\n\r\nMã hàng\t9786045654873\r\nTên Nhà Cung Cấp\tPhụ Nữ\r\nTác giả\tMaria Metlitskaya\r\nNgười Dịch\tPhan Xuân Loan\r\nNXB\tNXB Phụ Nữ\r\nNăm XB\t2018\r\nTrọng lượng (gr)\t300\r\nKích Thước Bao Bì\t13.5 x 20.5\r\nSố trang\t264\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Tiểu thuyết bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nHẳn với các độc giả yêu văn học Nga, cái tên Maria Metlitskaya không còn quá xa lạ. Sâu cay và hóm hỉnh, nữ văn sĩ xứ Bạch Dương đã từng khiến chúng ta không khỏi ôm bụng ngặt nghẽo trước những trận chiến bi hài không hồi kết giữa mẹ chồng và nàng dâu trong cuốn tiểu thuyết vui nhộn Nhật kí mẹ chồng. Và trong suốt một thời gian dài, Nhật kí mẹ chồng gần như trở thành một thứ bảo bối cho bất kì ai đang có ý định “láng cháng” đến gần với cánh cửa hôn nhân.\r\n\r\nTuy nhiên, đã bao giờ bạn tò mò muốn biết thêm về một Maria Metlitskaya mới, thâm trầm và sâu sắc hơn? Vậy thì sau Nhật kí mẹ chồng, hãy thử tìm đến bà qua tác phẩm mới đầy tính nhân văn, Vợ, người tình và quý ông hoàn hảo.\r\n\r\nVợ, người tình và quý ông hoàn hảo xoay quanh cuộc đời Nadya – một người phụ nữ tưởng như đã được số phận đối đãi hậu hĩnh khi ban cho một người chồng học thức, thành đạt; một cô con gái xinh đẹp ở nước ngoài và một cuộc sống đủ đầy, không phải lo toan cơm áo như bao người đàn bà khác. Thế nhưng sự hoàn hảo đó chỉ là vẻ bề ngoài, chẳng một ai biết được chị đã cô đơn nhường nào bên những người ruột thịt trong chính tổ ấm mà mình vẫn vun vén hằng ngày. Và cái ngày người chồng mà chị tôn thờ như Chúa sống nằm xuống, ngỡ như rằng từ đây chị đã có thể nhẹ nhõm sống đời riêng mình, nhưng hóa ra, đó lại là cú nốc ao mà người chồng chung thủy dành tặng cho người vợ tận tụy bao năm của mình. Nadya tình cờ phát hiện ra chồng chị có một cuộc đời bí mật. Một cuộc đời ngồn ngộn sự kiện, trải nghiệm và đồng cảm về một người đàn bà khác. Ngoài vợ mình.\r\n\r\n“Đến đấy bỗng một ý nghĩ xuyên thấu tim chị – vậy là họ đã sống cả đời như người lạ. Hoàn toàn xa lạ! Người ta còn biết nhiều hơn về láng giềng cạnh căn hộ mình hay người đồng hành trên xe lửa. Còn anh chưa từng buồn lo cho chị, chị cũng chưa từng hiểu hết về anh. Thật là kinh tởm!”\r\n\r\nKhông hề có những trường đoạn mô tả nhục cảm, không một lần Nadya tận mắt chứng kiến cảnh chồng mình bên nhân tình; thế nhưng Maria Metlitskaya, hơn ai hết có thể thấu tỏ những thấm buốt của người vợ khi vỡ lẽ ra cuộc hôn nhân của họ hóa ra chỉ là “sự lựa chọn đúng đắn” của chồng và chị rốt cuộc vẫn chỉ là người đàn bà nhòm trộm cuộc sống riêng tư của chồng qua lỗ khóa. Người chồng ấy đã nợ vợ mình cả cuộc đời. Nhưng chua xót thay, ông ta lại xem đó là cái giá đương nhiên sau khi đã đem đến cho vợ sự đủ đầy vật chất.\r\n\r\nĐến với Vợ, người tình và quý ông hoàn hảo, ta như cảm nhận thấy một cuộc rượt đuổi tình cảm liên tu bất tận giữa người chồng, người vợ và cô nhân tình. Cả ba đều chấp chới, vô vọng hướng về ảo ảnh trái ngang để rồi rốt cuộc tự làm chính mình mệt nhoài trong thế sự cuộc đời, trong tình yêu biến ảo, và trong dục vọng tham lam.\r\n\r\nKhông còn là một Metlitskaya hài hước trong Nhật kí mẹ chồng, nữ nhà văn tài năng của nước Nga đã đặt ra trong tác phẩm mới của mình những vấn đề nghiêm túc về tâm lý, đạo đức xã hội mà mỗi chúng ta đều phải đối mặt và suy ngẫm trong cuộc sống “để không bị nợ nần, cả về đạo đức lẫn tâm hồn. Để tự do với lương tâm thanh thản”. Bà đã gióng lên một hồi chuông cảnh báo về sự biến chất của những gì sâu xa nhất, thiêng liêng nhất khi người ta nhân danh tình yêu để tự cho phép mình hủy hoại một cuộc đời khác và những oái oăm, ngang trái mà những người lương thiện phải gánh chịu.\r\n\r\nNhà xuất bản Phụ nữ xin gửi đến các độc giả những trang văn chất chứa cảm xúc về một trong những vấn đề nhạy cảm nhất của cuộc sống hôn nhân thời hiện đại vào mùa thu năm 2018.",
        "public": true,
        "publish_date": "2017",
        "author": "Maria Metlitskaya",
        "amount": 264,
        "number_of_page": 264,
        "sold": 48,
        "rating": 5,
        "price": 67320,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/i/m/image_190536.jpg",
        "slug": "vo-nguoi-tinh-va-quy-ong-hoan-hao",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-10T03:47:46.704Z",
        "category": {
            "id": 9,
            "name": "TIỂU THUYẾT",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-09T13:55:04.228Z"
        },
        "images": []
    },
    {
        "id": 282,
        "name": "Tắt Đèn (Tái Bản 2022)",
        "description": "Tắt Đèn - Ngô Tất Tố giới thiệu cùng bạn đọc nguyên tác tiểu thuyết Tắt đèn theo đúng cấu trúc, hành văn và ngôn từ… đã sáng tác của tác giả, có kèm theo những ghi chú chi tiết nhằm chỉnh sửa và cải chính những sai lệch của mấy chục lần tái bản vừa qua cùng với khối lượng lớn chú giải và biên soạn phụ lục có liên quan đến nội dung của tác phẩm.\r\n\r\nNhững chỗ còn nghi vấn, những chỗ cần làm rõ ý hoặc có thể là không giống như cách diễn đạt hiện nay, sau khi tra cứu cũng xin được ghi chú cụ thể.\r\n\r\nTái bản tiểu thuyết Tắt đèn được khôi phục theo nguyên tắc lần này nhằm góp phần ngăn chặn, chấm dứt thực trạng in sách xô bồ, làm hỏng các tác phẩm kinh điển xảy ra ngay từ trong ngành xuất bản.",
        "public": true,
        "publish_date": "2022",
        "author": "Ngô Tất Tố",
        "amount": 156,
        "number_of_page": 156,
        "sold": 1,
        "rating": 5,
        "price": 35700,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/9/7/9786043725377.jpg",
        "slug": "tat-den-tai-ban-2022",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 9,
            "name": "TIỂU THUYẾT",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-09T13:55:04.228Z"
        },
        "images": []
    },
    {
        "id": 283,
        "name": "Từng Có Người Yêu Tôi Như Sinh Mệnh (Tái Bản 2020)",
        "description": "Cô bé của tôi,\r\n\r\nchúc em một đời\r\n\r\nbình an vui vẻ.\r\n\r\n-----\r\n\r\nTác giả\r\n\r\nThư Nghi - Nhà văn thuộc thế hệ 7X\r\n\r\nTừng tốt nghiệp đại học danh tiếng, nhiều năm làm giám đốc cho công ty nước ngoài. Tuy làm việc trong môi trường kỹ thuật nhưng cô lại rất yêu văn chương.\r\n\r\nCác tác phẩm tiêu biểu:\r\n\r\n- Bẫy văn phòng\r\n\r\n- Từng có người yêu tôi như sinh mệnh\r\n\r\nMã hàng\t8935212350433\r\nTên Nhà Cung Cấp\tĐinh Tị\r\nTác giả\tThư Nghi\r\nNgười Dịch\tGreenrosetq\r\nNXB\tNXB Văn Học\r\nNăm XB\t2020\r\nTrọng lượng (gr)\t480\r\nKích Thước Bao Bì\t20.5 x 14.5 cm\r\nSố trang\t464\r\nHình thức\tBìa Mềm\r\nSản phẩm hiển thị trong\t\r\nĐinh Tị\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Ngôn Tình bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nCô bé của tôi,\r\n\r\nchúc em một đời\r\n\r\nbình an vui vẻ.\r\n\r\n-----\r\n\r\nTác giả\r\n\r\nThư Nghi - Nhà văn thuộc thế hệ 7X\r\n\r\nTừng tốt nghiệp đại học danh tiếng, nhiều năm làm giám đốc cho công ty nước ngoài. Tuy làm việc trong môi trường kỹ thuật nhưng cô lại rất yêu văn chương.\r\n\r\nCác tác phẩm tiêu biểu:\r\n\r\n- Bẫy văn phòng\r\n\r\n- Từng có người yêu tôi như sinh mệnh",
        "public": true,
        "publish_date": "2020",
        "author": "Thư Nghi",
        "amount": 464,
        "number_of_page": 464,
        "sold": 84,
        "rating": 5,
        "price": 86430,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/flashmagazine/images/page_images/tung_co_nguoi_yeu_toi_nhu_sinh_menh_tai_ban_2020/2020_11_17_16_30_39_1-390x510.jpg",
        "slug": "tung-co-nguoi-yeu-toi-nhu-sinh-menh-tai-ban-2020",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-10T03:47:46.705Z",
        "category": {
            "id": 10,
            "name": "NGÔN TÌNH",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 284,
        "name": "Thất Tịch Không Mưa (Tái Bản 2017)",
        "description": "Từ nhỏ cô đã thầm yêu anh, như số kiếp không thể thay đổi Tình yêu trong sáng ấy, như lần đầu được nếm mùi vị của quả khế mới chín. Sau đó cô và anh xa nhau, gặp lại đều cách nhau ba năm.\r\n\r\nTình yêu, giống như lần đầu được nếm thử quả khế mới chín.\r\n\r\nChua chua, chát chát, nhưng không kìm được, vẫn muốn nếm thêm lần nữa.\r\n\r\nTrong quả khế chát xanh xanh, nụ cười ngốc nghếch, ngọt ngào của anh, tình đầu thơ ngây, trong sáng của em lặng lẽ nảy mầm.\r\n\r\nMã hàng\t8935212348904\r\nTên Nhà Cung Cấp\tĐinh Tị\r\nTác giả\tLâu Vũ Tình\r\nNgười Dịch\tCẩm Ninh\r\nNXB\tPhụ Nữ\r\nNăm XB\t2017\r\nNgôn Ngữ\tTiếng Việt\r\nTrọng lượng (gr)\t300\r\nKích Thước Bao Bì\t13 x 20.5 cm x 1.6\r\nSố trang\t320\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Ngôn Tình bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nTừ nhỏ cô đã thầm yêu anh, như số kiếp không thể thay đổi Tình yêu trong sáng ấy, như lần đầu được nếm mùi vị của quả khế mới chín. Sau đó cô và anh xa nhau, gặp lại đều cách nhau ba năm.\r\n\r\nTình yêu, giống như lần đầu được nếm thử quả khế mới chín.\r\n\r\nChua chua, chát chát, nhưng không kìm được, vẫn muốn nếm thêm lần nữa.\r\n\r\nTrong quả khế chát xanh xanh, nụ cười ngốc nghếch, ngọt ngào của anh, tình đầu thơ ngây, trong sáng của em lặng lẽ nảy mầm.\r\n\r\n",
        "public": true,
        "publish_date": "2016",
        "author": "Lâu Vũ Tình",
        "amount": 320,
        "number_of_page": 320,
        "sold": 1,
        "rating": 5,
        "price": 57620,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_14864.jpg",
        "slug": "that-tich-khong-mua-tai-ban-2017",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 10,
            "name": "NGÔN TÌNH",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 285,
        "name": "Bến Xe (Tái Bản 2020)",
        "description": "Bến Xe (Tái Bản 2020)\r\n\r\nBến Xe\r\n\r\nThứ tôi có thể cho em trong cuộc đời này\r\n\r\nchỉ là danh dự trong sạch\r\n\r\nvà một tương lai tươi đẹp mà thôi.\r\n\r\nThế nhưng, nếu chúng ta có kiếp sau,\r\n\r\nnếu kiếp sau tôi có đôi mắt sáng,\r\n\r\ntôi sẽ ở bến xe này… đợi em.\r\n\r\nMã hàng\t8935212349208\r\nTên Nhà Cung Cấp\tĐinh Tị\r\nTác giả\tThương Thái Vi\r\nNgười Dịch\tGreenrosetq\r\nNXB\tVăn Học\r\nNăm XB\t2020\r\nNgôn Ngữ\tTiếng Việt\r\nTrọng lượng (gr)\t300\r\nKích Thước Bao Bì\t20.5 x 13 x 1.3 cm\r\nSố trang\t284\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Ngôn Tình bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nBến Xe (Tái Bản 2020)\r\n\r\nBến Xe\r\n\r\nThứ tôi có thể cho em trong cuộc đời này\r\n\r\nchỉ là danh dự trong sạch\r\n\r\nvà một tương lai tươi đẹp mà thôi.\r\n\r\nThế nhưng, nếu chúng ta có kiếp sau,\r\n\r\nnếu kiếp sau tôi có đôi mắt sáng,\r\n\r\ntôi sẽ ở bến xe này… đợi em.\r\n\r\n",
        "public": true,
        "publish_date": "2019",
        "author": "Thương Thái Vi",
        "amount": 284,
        "number_of_page": 284,
        "sold": 1,
        "rating": 5,
        "price": 64600,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/8/9/8935212349208_1.jpg",
        "slug": "ben-xe-tai-ban-2020",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 10,
            "name": "NGÔN TÌNH",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 286,
        "name": "Mãi Mãi Là Bao Xa (Tái Bản)",
        "description": "\"Em là cây hoa loa kèn hoang dã mãi mãi chỉ vì chính mình mà nở hoa, rời khỏi đất mẹ là cái giá phải trả khi yêu anh.\"\r\n\r\n-------\r\n\r\nBạch Lăng Lăng, nữ sinh khoa Điện khí, trẻ trung, xinh đẹp và rất tự hào khi quen được một người bạn lý tưởng qua mạng, chàng du học sinh của một trường nổi tiếng của Mỹ, người mang biệt danh “nhà khoa học”: Mãi Mãi Là Bao Xa. Qua những cuộc chuyện trò trên QQ, Lăng Lăng đã gắn bó với chàng trai đó lúc nào cô cũng không hay, cảm xúc lớn dần, sự chia sẻ lớn dần và đến một ngày cô phát hiện ra mình đã yêu người con trai “tài giỏi” và không một chút khuyết điểm ấy.\r\n\r\nNhưng sự tỉnh táo giúp cô ý thức được rằng, thế giới mạng chỉ là ảo, họ ở cách nhau cả một đại dương mênh mông, anh lại quá xuất sắc và ưu tú, mối quan hệ của họ sẽ không có kết quả gì. Nhất là khi anh thông báo, nếu anh tiếp tục sự nghiệp nghiên cứu lần này, rất có thể anh phải định cư bên Mỹ, mãi mãi không trở về. Khi nghe tin đó, cô đã gục xuống trước màn hình máy tính và khóc. Tất cả như sụp đổ, tia hy vọng cuối cùng dập tắt, anh sẽ không về nước nữa, khoảng cách giữa họ là mãi mãi… Cô cay đắng nói với anh lời từ biệt và đưa nick của anh vào danh sách đen, không bao giờ xuất hiện khi cô đăng nhập QQ nữa…\r\n\r\nMột năm trôi qua, Lăng Lăng tưởng đã quên đi “nhà khoa học” ở bên kia thế giới của mình, bên cô đã có Uông Đào, bạn trai, người mang lại cho cô cảm giác an toàn, người cô muốn lấy làm chồng dù cảm xúc dành cho anh chưa hẳn là tình yêu. Cô bảo vệ đề án tốt nghiệp, Uông Đào luôn quấn quýt bên cô… Và điều bất ngờ trong buổi bảo vệ đề án, Dương Lam Hàng, một giảng viên trẻ vừa trở về từ MIT, trường đại học danh tiếng của Mỹ, xuất thân từ một gia đình danh giá, đã tới tham dự buổi bảo vệ của cô và đưa ra những câu hỏi phản biện thật “khó chịu”.\r\n\r\nVới cô, Tất cả các nữ sinh trong trường đều ngưỡng mỗ và ao ước được trở thành bóng hồng trong trái tim của Dương Lam Hàng, nhưng với cô, đó đúng là ông thầy “biến thái”. Sự trớ trêu của số phận đun đẩy khiến cô ngày càng tiếp xúc với anh nhiều hơn, và chính anh là người gợi ý và nâng đỡ cho cô học tiếp thạc sĩ để có cơ hội ở lại trường.\r\n\r\nTrở thành học viên của khoa Vật liệu, bao thách thức và khó khăn chờ đón cô, dưới sự dìu dắt và yêu cầu quá cao của thầy hướng dẫn, cô dần dần làm quen với công việc… Những buổi thảo luận, những lần thí nghiệm, những sự giúp đỡ, những lời quan tâm chân thành, và cộng thêm vẻ ngoài lạnh lùng, điễm tĩnh, rất đẹp của Dương Lam Hàng, trái tim Lăng Lăng cũng xao động.\r\n\r\nMột bên là người gần gũi với cô hằng ngày, chăm lo cho cô, nâng đỡ cô từng chút một, một bên là chàng trai ở mãi tận nơi xa, chưa một lần gặp mặt. Lăng Lăng giằng xé và không biết trái tim mình nghiêng về bên nào nhiều hơn. Đến khi cảm xúc vỡ òa, cô quyết định dừng học bởi không muốn gặp người thầy đã chiếm giữ vị trí trong trái tim cô, cô muốn chung thủy với tình cảm cho chàng trai Mãi Mãi Là Bao Xa, người chia sẻ và dành cho cô tình cảm chân thành, thì cũng là lúc cô phát hiện ra hình như Dương Lam Hàng và người cô yêu có thật nhiều điểm tương đồng. Mãi Mãi Là Bao Xa nói anh đã về nước và sẽ đến gặp cô… Vậy người thầy bên cô bấy lâu nay là ai?\r\n\r\nMã hàng\t8935212358231\r\nTên Nhà Cung Cấp\tĐinh Tị\r\nTác giả\tDiệp Lạc Vô Tâm\r\nNgười Dịch\tNguyễn Thị Thại\r\nNXB\tThanh Niên\r\nNăm XB\t2022\r\nTrọng lượng (gr)\t600\r\nKích Thước Bao Bì\t24 x 16 x 2.7 cm\r\nSố trang\t590\r\nHình thức\tBìa Mềm\r\nSản phẩm hiển thị trong\t\r\nĐinh Tị\r\nRƯỚC DEAL LINH ĐÌNH VUI ĐÓN TRUNG THU\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Ngôn Tình bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\n\"Em là cây hoa loa kèn hoang dã mãi mãi chỉ vì chính mình mà nở hoa, rời khỏi đất mẹ là cái giá phải trả khi yêu anh.\"\r\n\r\n-------\r\n\r\nBạch Lăng Lăng, nữ sinh khoa Điện khí, trẻ trung, xinh đẹp và rất tự hào khi quen được một người bạn lý tưởng qua mạng, chàng du học sinh của một trường nổi tiếng của Mỹ, người mang biệt danh “nhà khoa học”: Mãi Mãi Là Bao Xa. Qua những cuộc chuyện trò trên QQ, Lăng Lăng đã gắn bó với chàng trai đó lúc nào cô cũng không hay, cảm xúc lớn dần, sự chia sẻ lớn dần và đến một ngày cô phát hiện ra mình đã yêu người con trai “tài giỏi” và không một chút khuyết điểm ấy.\r\n\r\nNhưng sự tỉnh táo giúp cô ý thức được rằng, thế giới mạng chỉ là ảo, họ ở cách nhau cả một đại dương mênh mông, anh lại quá xuất sắc và ưu tú, mối quan hệ của họ sẽ không có kết quả gì. Nhất là khi anh thông báo, nếu anh tiếp tục sự nghiệp nghiên cứu lần này, rất có thể anh phải định cư bên Mỹ, mãi mãi không trở về. Khi nghe tin đó, cô đã gục xuống trước màn hình máy tính và khóc. Tất cả như sụp đổ, tia hy vọng cuối cùng dập tắt, anh sẽ không về nước nữa, khoảng cách giữa họ là mãi mãi… Cô cay đắng nói với anh lời từ biệt và đưa nick của anh vào danh sách đen, không bao giờ xuất hiện khi cô đăng nhập QQ nữa…\r\n\r\nMột năm trôi qua, Lăng Lăng tưởng đã quên đi “nhà khoa học” ở bên kia thế giới của mình, bên cô đã có Uông Đào, bạn trai, người mang lại cho cô cảm giác an toàn, người cô muốn lấy làm chồng dù cảm xúc dành cho anh chưa hẳn là tình yêu. Cô bảo vệ đề án tốt nghiệp, Uông Đào luôn quấn quýt bên cô… Và điều bất ngờ trong buổi bảo vệ đề án, Dương Lam Hàng, một giảng viên trẻ vừa trở về từ MIT, trường đại học danh tiếng của Mỹ, xuất thân từ một gia đình danh giá, đã tới tham dự buổi bảo vệ của cô và đưa ra những câu hỏi phản biện thật “khó chịu”.\r\n\r\nVới cô, Tất cả các nữ sinh trong trường đều ngưỡng mỗ và ao ước được trở thành bóng hồng trong trái tim của Dương Lam Hàng, nhưng với cô, đó đúng là ông thầy “biến thái”. Sự trớ trêu của số phận đun đẩy khiến cô ngày càng tiếp xúc với anh nhiều hơn, và chính anh là người gợi ý và nâng đỡ cho cô học tiếp thạc sĩ để có cơ hội ở lại trường.\r\n\r\nTrở thành học viên của khoa Vật liệu, bao thách thức và khó khăn chờ đón cô, dưới sự dìu dắt và yêu cầu quá cao của thầy hướng dẫn, cô dần dần làm quen với công việc… Những buổi thảo luận, những lần thí nghiệm, những sự giúp đỡ, những lời quan tâm chân thành, và cộng thêm vẻ ngoài lạnh lùng, điễm tĩnh, rất đẹp của Dương Lam Hàng, trái tim Lăng Lăng cũng xao động.\r\n\r\nMột bên là người gần gũi với cô hằng ngày, chăm lo cho cô, nâng đỡ cô từng chút một, một bên là chàng trai ở mãi tận nơi xa, chưa một lần gặp mặt. Lăng Lăng giằng xé và không biết trái tim mình nghiêng về bên nào nhiều hơn. Đến khi cảm xúc vỡ òa, cô quyết định dừng học bởi không muốn gặp người thầy đã chiếm giữ vị trí trong trái tim cô, cô muốn chung thủy với tình cảm cho chàng trai Mãi Mãi Là Bao Xa, người chia sẻ và dành cho cô tình cảm chân thành, thì cũng là lúc cô phát hiện ra hình như Dương Lam Hàng và người cô yêu có thật nhiều điểm tương đồng. Mãi Mãi Là Bao Xa nói anh đã về nước và sẽ đến gặp cô… Vậy người thầy bên cô bấy lâu nay là ai?",
        "public": true,
        "publish_date": "2021",
        "author": "Diệp Lạc Vô Tâm",
        "amount": 500,
        "number_of_page": 590,
        "sold": 1,
        "rating": 5,
        "price": 90450,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/8/9/8935212358231.jpg",
        "slug": "mai-mai-la-bao-xa-tai-ban",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 10,
            "name": "NGÔN TÌNH",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 287,
        "name": "Ngàn Năm Chờ Đợi (Tái Bản 2023)",
        "description": "Ngàn Năm Chờ Đợi (Tái Bản 2023)\r\n\r\nChàng là Tuế Tinh chân quân – Thanh Ngưng, chính là ngôi sao sáng ở phương đông. Chàng có thể tạo ra vạn vật thế gian, biến khổ thành phúc, được người đời kính ngưỡng, cúng bái thờ phụng.\r\n\r\nChàng sống cô đơn cả ngàn năm trên trời, công việc chủ yếu của chàng là giúp đỡ mọi người, có một người bạn cờ là Thái Bạch Kim Tinh.\r\n\r\nMột hôm chàng thấy các tiên nữ đang dùng bùn đất để nặn hình người. Chàng đã chọn đống bùn đất có màu sáng nhất để cẩn thận nặn nặn tạc tạc. Chàng nặn rất lâu, rất nhiều lần cuối cùng nặn ra hình dáng một cô gái xinh đẹp hoàn mỹ nhất trong lòng chàng.\r\n\r\nChàng để bức tượng cô gái trong cung điện của mình, ngày ngày trò chuyện với nàng, vuốt ve mái tóc nàng, còn mặc áo quàng khăn cho nàng, tiếc rằng nàng không thể trả lời chàng. (Thực ra nàng có thể nghe được chàng nói, nhưng nàng không có linh hồn, không nói được, không có cảm giác.)\r\n\r\nÔng bạn cờ của chàng thấy chàng si mê một bức tượng đất như vậy, không đành lòng, ông ném bức tượng xuống thế gian…\r\n\r\nChàng bay theo nàng xuống thế gian nhưng không kịp cứu nàng, nàng chỉ là tượng đất, vỡ ra thành muôn mảnh, cầm một mảnh vỡ lên, chàng rơi lệ.\r\n\r\nMột giọt lệ của chàng đã giúp nàng bảo vệ nguyên thần, trải qua nhiều năm, linh hồn nàng hợp lại, bảo vệ được hình tượng hoàn mỹ trong lòng chàng… Nàng trở thành tiên nữ tên Y Vân, mới thăng thiên.\r\n\r\nTrong một yến hội trên thiên giới, chàng gặp lại nàng… Nàng lại giả như không quen biết chàng, vì sợ tình yêu sẽ ảnh hưởng đến chàng (thần tiên trên thiên giới không được yêu). Chàng đã bao che cho nàng rất nhiều lần xuống hạ giới. Nàng đã cùng Tôn Giả Kim Thiền Tử bày cách giả có tình ý để Thanh Ngưng có thể quên được nàng. Nàng và Kim Thiền Tử bị Vương mẫu nương nương trừng trị, Thanh Ngưng đã đứng ra nhận tội thay nàng.\r\n\r\nSau đó hai người chỉ có thể đầu thai luân hồi dưới trần thế mới có thể yêu nhau, ở bên nhau và đương nhiên họ nguyện lòng.\r\n\r\nMã hàng\t8935212361460\r\nTên Nhà Cung Cấp\tĐinh Tị\r\nTác giả\tDiệp Lạc Vô Tâm\r\nNXB\tVăn Học\r\nNăm XB\t2023\r\nNgôn Ngữ\tTiếng Việt\r\nTrọng lượng (gr)\t200\r\nKích Thước Bao Bì\t20.5 x 13 x 1 cm\r\nSố trang\t176\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Ngôn Tình bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nNgàn Năm Chờ Đợi (Tái Bản 2023)\r\n\r\nChàng là Tuế Tinh chân quân – Thanh Ngưng, chính là ngôi sao sáng ở phương đông. Chàng có thể tạo ra vạn vật thế gian, biến khổ thành phúc, được người đời kính ngưỡng, cúng bái thờ phụng.\r\n\r\nChàng sống cô đơn cả ngàn năm trên trời, công việc chủ yếu của chàng là giúp đỡ mọi người, có một người bạn cờ là Thái Bạch Kim Tinh.\r\n\r\nMột hôm chàng thấy các tiên nữ đang dùng bùn đất để nặn hình người. Chàng đã chọn đống bùn đất có màu sáng nhất để cẩn thận nặn nặn tạc tạc. Chàng nặn rất lâu, rất nhiều lần cuối cùng nặn ra hình dáng một cô gái xinh đẹp hoàn mỹ nhất trong lòng chàng.\r\n\r\nChàng để bức tượng cô gái trong cung điện của mình, ngày ngày trò chuyện với nàng, vuốt ve mái tóc nàng, còn mặc áo quàng khăn cho nàng, tiếc rằng nàng không thể trả lời chàng. (Thực ra nàng có thể nghe được chàng nói, nhưng nàng không có linh hồn, không nói được, không có cảm giác.)\r\n\r\nÔng bạn cờ của chàng thấy chàng si mê một bức tượng đất như vậy, không đành lòng, ông ném bức tượng xuống thế gian…\r\n\r\nChàng bay theo nàng xuống thế gian nhưng không kịp cứu nàng, nàng chỉ là tượng đất, vỡ ra thành muôn mảnh, cầm một mảnh vỡ lên, chàng rơi lệ.\r\n\r\nMột giọt lệ của chàng đã giúp nàng bảo vệ nguyên thần, trải qua nhiều năm, linh hồn nàng hợp lại, bảo vệ được hình tượng hoàn mỹ trong lòng chàng… Nàng trở thành tiên nữ tên Y Vân, mới thăng thiên.\r\n\r\nTrong một yến hội trên thiên giới, chàng gặp lại nàng… Nàng lại giả như không quen biết chàng, vì sợ tình yêu sẽ ảnh hưởng đến chàng (thần tiên trên thiên giới không được yêu). Chàng đã bao che cho nàng rất nhiều lần xuống hạ giới. Nàng đã cùng Tôn Giả Kim Thiền Tử bày cách giả có tình ý để Thanh Ngưng có thể quên được nàng. Nàng và Kim Thiền Tử bị Vương mẫu nương nương trừng trị, Thanh Ngưng đã đứng ra nhận tội thay nàng.\r\n\r\nSau đó hai người chỉ có thể đầu thai luân hồi dưới trần thế mới có thể yêu nhau, ở bên nhau và đương nhiên họ nguyện lòng.",
        "public": true,
        "publish_date": "2022",
        "author": "Diệp Lạc Vô Tâm",
        "amount": 200,
        "number_of_page": 176,
        "sold": 1,
        "rating": 5,
        "price": 38500,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/n/g/ngan_nam_cho_doi_5a499550e6b74f79bc3a79e9790b46ec_master_1.jpg",
        "slug": "ngan-nam-cho-doi-tai-ban-2023",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 10,
            "name": "NGÔN TÌNH",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 288,
        "name": "Ngoảnh Lại Đã Một Đời",
        "description": "Ngoảnh Lại Đã Một Đời\r\n\r\n“Đời người trăm năm, qua đi vội vã, bao nhiêu phong cảnh đợi bạn đến chiêm ngưỡng, bao nhiêu câu chuyện đợi bạn đến lấp đầy. Những gặp gỡ, truy cầu, được mất trong hành trình, đều là tu hành. Tuế nguyệt dần dần qua đi, lúc như vô tình, lúc lại như hữu ý, không cố chấp đối với mọi việc, thì sẽ không vui quá hóa nhàm, buồn quá thành tuyệt vọng. Đời người giống như là chèo thuyền trên sóng khơi, nên giữ vững nội tâm, mới có thể thong dong điềm tĩnh, từ gấp gáp đến chậm rãi, từ ồn ã đến yên ả.”\r\n\r\nĐôi nét tác giả\r\n\r\nBạch Lạc Mai tên thật là Tư Trí Tuệ, sống ở Giang Nam, đơn giản tự chủ, tâm như lan thảo, văn chương thanh đạm.\r\n\r\nCẩm Phong đã xuất bản:\r\n\r\n- Năm tháng tĩnh lặng, kiếp này bình yên\r\n\r\n- Gặp lại chốn hồng trần sâu nhất\r\n\r\n- Duyên\r\n\r\n- Nếu em an lành, đó là ngày nắng\r\n\r\nMã hàng\t8936117741869\r\nTên Nhà Cung Cấp\tZGROUP\r\nTác giả\tBạch Lạc Mai\r\nNgười Dịch\tLục Bích\r\nNXB\tNXB Hà Nội\r\nNăm XB\t2019\r\nTrọng lượng (gr)\t320\r\nKích Thước Bao Bì\t12 x 19 x 1.5\r\nSố trang\t316\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Ngôn Tình bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nNgoảnh Lại Đã Một Đời\r\n\r\n“Đời người trăm năm, qua đi vội vã, bao nhiêu phong cảnh đợi bạn đến chiêm ngưỡng, bao nhiêu câu chuyện đợi bạn đến lấp đầy. Những gặp gỡ, truy cầu, được mất trong hành trình, đều là tu hành. Tuế nguyệt dần dần qua đi, lúc như vô tình, lúc lại như hữu ý, không cố chấp đối với mọi việc, thì sẽ không vui quá hóa nhàm, buồn quá thành tuyệt vọng. Đời người giống như là chèo thuyền trên sóng khơi, nên giữ vững nội tâm, mới có thể thong dong điềm tĩnh, từ gấp gáp đến chậm rãi, từ ồn ã đến yên ả.”\r\n\r\nĐôi nét tác giả\r\n\r\nBạch Lạc Mai tên thật là Tư Trí Tuệ, sống ở Giang Nam, đơn giản tự chủ, tâm như lan thảo, văn chương thanh đạm.\r\n\r\nCẩm Phong đã xuất bản:\r\n\r\n- Năm tháng tĩnh lặng, kiếp này bình yên\r\n\r\n- Gặp lại chốn hồng trần sâu nhất\r\n\r\n- Duyên\r\n\r\n- Nếu em an lành, đó là ngày nắng",
        "public": true,
        "publish_date": "2018",
        "author": "Bạch Lạc Mai",
        "amount": 316,
        "number_of_page": 316,
        "sold": 1,
        "rating": 5,
        "price": 100000,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/b/i/bia-1_ngoanh-lai-da-mot-doi.jpg",
        "slug": "ngoanh-lai-da-mot-doi",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 10,
            "name": "NGÔN TÌNH",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 289,
        "name": "Đoán Xem Anh Yêu Em Nhường Nào (Tái Bản 2019)",
        "description": "Thông tin tác giả:\r\n\r\nSuperpanda là tác giả của mạng văn học Tấn Giang. Thể loại sở trường là đô thị, lãng mạn. Các tác phẩm của Superpanda luôn nhận được sự ủng hộ từ độc giả.\r\n\r\nThông tin tác phẩm:\r\n\r\n“Đoán xem anh yêu em nhường nào” gồm 21 chương, câu chuyện xoanh quanh hai nhân vật Phù Hiểu và Trần Ý Hành. Hai người tốt nghiệp cùng một trường đại học. Phù Hiểu muốn trở thành nhà điều chế nước hoa nổi tiếng thế giới, còn Thẩm Ý Hành muốn mở công ty dược, tạo ra biệt dược gốc ngay tại đất nước mình.\r\n\r\nVì giấc mơ của chính mình mà hai người lựa chọn đè nén lại tình yêu, bước vào mối quan hệ “quen nửa vời” vô cùng kỳ quặc: Không thể tùy ý gặp mặt, nắm tay hay ôm hôn, mỗi một phần thưởng giản dị của tình yêu, đều phải nhờ vào bước tiến triển trong sự nghiệp. Tình cảm cùng sự nghiệp cứ thế song hành, lặng lẽ lớn dần lên qua những năm tháng “quen nửa vời” kỳ lạ đó.\r\n\r\nVà “Kỳ tích xảy ra mỗi ngày, không đến nỗi xa xôi không với tới như vậy đâu. Bây giờ dân số thế giới là 7,2 tỉ người, nghĩa là số bảy mươi hai kèm theo tám số không đằng sau đó. Mà giữa 7,2 tỉ người, anh lại tìm thấy em, lẽ nào không phải kỳ tích sao?”\r\n\r\nMã hàng\t9786049810510\r\nTên Nhà Cung Cấp\tBách Việt\r\nTác giả\tSuperpanda\r\nNgười Dịch\tTích Vũ\r\nNXB\tNXB Thanh Niên\r\nNăm XB\t2019\r\nTrọng lượng (gr)\t400\r\nKích Thước Bao Bì\t14.5 x 20.5 x 1.8\r\nSố trang\t380\r\nHình thức\tBìa Mềm\r\nSản phẩm hiển thị trong\t\r\nBách Việt\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Ngôn Tình bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nThông tin tác giả:\r\n\r\nSuperpanda là tác giả của mạng văn học Tấn Giang. Thể loại sở trường là đô thị, lãng mạn. Các tác phẩm của Superpanda luôn nhận được sự ủng hộ từ độc giả.\r\n\r\nThông tin tác phẩm:\r\n\r\n“Đoán xem anh yêu em nhường nào” gồm 21 chương, câu chuyện xoanh quanh hai nhân vật Phù Hiểu và Trần Ý Hành. Hai người tốt nghiệp cùng một trường đại học. Phù Hiểu muốn trở thành nhà điều chế nước hoa nổi tiếng thế giới, còn Thẩm Ý Hành muốn mở công ty dược, tạo ra biệt dược gốc ngay tại đất nước mình.\r\n\r\nVì giấc mơ của chính mình mà hai người lựa chọn đè nén lại tình yêu, bước vào mối quan hệ “quen nửa vời” vô cùng kỳ quặc: Không thể tùy ý gặp mặt, nắm tay hay ôm hôn, mỗi một phần thưởng giản dị của tình yêu, đều phải nhờ vào bước tiến triển trong sự nghiệp. Tình cảm cùng sự nghiệp cứ thế song hành, lặng lẽ lớn dần lên qua những năm tháng “quen nửa vời” kỳ lạ đó.\r\n\r\nVà “Kỳ tích xảy ra mỗi ngày, không đến nỗi xa xôi không với tới như vậy đâu. Bây giờ dân số thế giới là 7,2 tỉ người, nghĩa là số bảy mươi hai kèm theo tám số không đằng sau đó. Mà giữa 7,2 tỉ người, anh lại tìm thấy em, lẽ nào không phải kỳ tích sao?”",
        "public": true,
        "publish_date": "2019",
        "author": "Superpanda",
        "amount": 380,
        "number_of_page": 380,
        "sold": 1,
        "rating": 5,
        "price": 66250,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_570.jpg",
        "slug": "doan-xem-anh-yeu-em-nhuong-nao-tai-ban-2019",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 10,
            "name": "NGÔN TÌNH",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 290,
        "name": "Trời Sinh Một Cặp",
        "description": "Tiểu thư Ngưu Ma Vương",
        "public": true,
        "publish_date": "2018",
        "author": "Tiểu thư Ngưu Ma Vương",
        "amount": 324,
        "number_of_page": 324,
        "sold": 1,
        "rating": 5,
        "price": 75650,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/i/m/image_189856.jpg",
        "slug": "troi-sinh-mot-cap",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 10,
            "name": "NGÔN TÌNH",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 291,
        "name": "Trâm 2 - Kẻ Yểu Mệnh (Tái Bản 2021)",
        "description": "\"Trên đời này, hễ có kẻ làm chuyện xấu, nhất định sẽ để lại dấu vết. Tôi không tin thời gian có thể chôn vùi tội ác.\"\r\n\r\nHoàng Tử Hà đã nói như thế khi đứng trước bất kỳ vụ án nào. Nhưng biết lần tìm manh môi ra sao nếu dấu vết lại chỉ là một tia sét trên trời, một lời đồn vu vơ, một giấc mơ vừa được nghe kể?\r\n\r\nNhững tưởng cơ hội trở về Thục giải vụ án oan của gia đình cô đang đến gần, thì một loạt sự kiện kỳ dị trong ngoài triều bỗng xảy ra - đích thân Đồng Xương công chúa yêu cầu hoạn quan Dương Sùng Cổ ra tay điều tra. Loay hoay giữa các dấu vết mơ hồ chẳng thể suy đoán, Hoàng Tử Hà đột nhiên gặp lại người con trai thuở thanh mai trúc mã, giờ đã coi cô như kẻ tử tù. Trăm ân nghìn oán cũng quá khứ vừa ngọt ngào vừa đau thương dễ làm rối trí. Đâu là người ngay, đâu là hung thủ? Sinh ra trong điện ngọc và chốn dân gian, số phận nào hạnh phúc hơn? Rốt cuộc trong đại án mênh mông này, kẻ yểu mệnh là ai?\r\n\r\nMã hàng\t8935235230293\r\nTên Nhà Cung Cấp\tNhã Nam\r\nTác giả\t Châu Văn Văn\r\nNgười Dịch\tTố Hinh\r\nNXB\tNXB Hà Nội\r\nNăm XB\t2021\r\nTrọng lượng (gr)\t630\r\nKích Thước Bao Bì\t20.5 x 14 cm\r\nSố trang\t570\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Ngôn Tình bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\n\"Trên đời này, hễ có kẻ làm chuyện xấu, nhất định sẽ để lại dấu vết. Tôi không tin thời gian có thể chôn vùi tội ác.\"\r\n\r\nHoàng Tử Hà đã nói như thế khi đứng trước bất kỳ vụ án nào. Nhưng biết lần tìm manh môi ra sao nếu dấu vết lại chỉ là một tia sét trên trời, một lời đồn vu vơ, một giấc mơ vừa được nghe kể?\r\n\r\nNhững tưởng cơ hội trở về Thục giải vụ án oan của gia đình cô đang đến gần, thì một loạt sự kiện kỳ dị trong ngoài triều bỗng xảy ra - đích thân Đồng Xương công chúa yêu cầu hoạn quan Dương Sùng Cổ ra tay điều tra. Loay hoay giữa các dấu vết mơ hồ chẳng thể suy đoán, Hoàng Tử Hà đột nhiên gặp lại người con trai thuở thanh mai trúc mã, giờ đã coi cô như kẻ tử tù. Trăm ân nghìn oán cũng quá khứ vừa ngọt ngào vừa đau thương dễ làm rối trí. Đâu là người ngay, đâu là hung thủ? Sinh ra trong điện ngọc và chốn dân gian, số phận nào hạnh phúc hơn? Rốt cuộc trong đại án mênh mông này, kẻ yểu mệnh là ai?",
        "public": true,
        "publish_date": "2020",
        "author": " Châu Văn Văn",
        "amount": 570,
        "number_of_page": 570,
        "sold": 1,
        "rating": 5,
        "price": 140250,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/i/m/image_232592.jpg",
        "slug": "tram-2-ke-yeu-menh-tai-ban-2021",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 10,
            "name": "NGÔN TÌNH",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 292,
        "name": "Nụ Hôn Của Sói",
        "description": "Nụ Hôn Của Sói (Tái Bản 2023)\r\n\r\nNếu An Dĩ Phong không tính là đàn ông, trên thế giới này không ai dám nói chính mình là đàn ông!\r\n\r\nNếu An Dĩ Phong không tính là yêu nghiệt, như vậy, trên thế giới này cũng không hề có yêu nghiệt...\r\n\r\nHắn là một người đàn ông như vậy, rong ruổi giang hồ mười lăm năm, ai dám cùng hắn một câu trái ý, về sau đừng nghĩ mở miệng nói chuyện. Hắn kiêu ngạo ương ngạnh, hoành hành ngang dọc, hắn cô độc, mệt mỏi...nhưng mấy ai biết rằng, trong tim hắn chỉ có một bóng hình, và có một người lặng lẽ yêu hắn, chờ hắn... ở một nơi rất xa.\r\nHài hước, lãng mạn, miêu tả tâm lý nhân vật cực khéo, cốt truyện gay cấn, tác giả đã tạo cho câu chuyện tình yêu đầy màu sắc cổ tích giữa một nữ cảnh sát và anh chàng lừng lẫy chốn giang hồ sự hấp dẫn đặc biệt. Đan xen vào câu chuyện tình yêu này là câu chuyện của tình bạn, tình anh em, tình cha con, của nghĩa khí, chữ tín và sức mạnh của những ước mơ. Đó chính là những điều tốt đẹp trong cuộc đời này.\r\n\r\nMã hàng\t8935212360067\r\nTên Nhà Cung Cấp\tĐinh Tị\r\nTác giả\tDiệp Lạc Vô Tâm\r\nNXB\tPhụ Nữ\r\nNăm XB\t2019\r\nNgôn Ngữ\tTiếng Việt\r\nTrọng lượng (gr)\t400\r\nKích Thước Bao Bì\t20.5 x 14.5 x 2 cm\r\nSố trang\t396\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Ngôn Tình bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nNụ Hôn Của Sói (Tái Bản 2023)\r\n\r\nNếu An Dĩ Phong không tính là đàn ông, trên thế giới này không ai dám nói chính mình là đàn ông!\r\n\r\nNếu An Dĩ Phong không tính là yêu nghiệt, như vậy, trên thế giới này cũng không hề có yêu nghiệt...\r\n\r\nHắn là một người đàn ông như vậy, rong ruổi giang hồ mười lăm năm, ai dám cùng hắn một câu trái ý, về sau đừng nghĩ mở miệng nói chuyện. Hắn kiêu ngạo ương ngạnh, hoành hành ngang dọc, hắn cô độc, mệt mỏi...nhưng mấy ai biết rằng, trong tim hắn chỉ có một bóng hình, và có một người lặng lẽ yêu hắn, chờ hắn... ở một nơi rất xa.\r\nHài hước, lãng mạn, miêu tả tâm lý nhân vật cực khéo, cốt truyện gay cấn, tác giả đã tạo cho câu chuyện tình yêu đầy màu sắc cổ tích giữa một nữ cảnh sát và anh chàng lừng lẫy chốn giang hồ sự hấp dẫn đặc biệt. Đan xen vào câu chuyện tình yêu này là câu chuyện của tình bạn, tình anh em, tình cha con, của nghĩa khí, chữ tín và sức mạnh của những ước mơ. Đó chính là những điều tốt đẹp trong cuộc đời này.",
        "public": true,
        "publish_date": "2018",
        "author": "Diệp Lạc Vô Tâm",
        "amount": 396,
        "number_of_page": 396,
        "sold": 1,
        "rating": 5,
        "price": 79730,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/n/u/nu-hon-cua-soi-2d_5408664d93b64dd4bd0ec392ff2ee9cb_master_1.jpg",
        "slug": "httpscdn0fahasacommediacatalogproductnunu-hon-cua-soi-2d5408664d93b64dd4bd0ec392ff2ee9cbmaster1jpg",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 10,
            "name": "NGÔN TÌNH",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 293,
        "name": "Tương Tư Thành Nắm Tro Tàn - Tập 2",
        "description": "Giữa trăm núi ngàn sông, vạn người thế gian, ta đã từng gặp những ai? Đã từng yêu thương ai? Có khi nào mơ mộng nghĩ chuyện mai sau? Rốt cuộc, tâm nguyện có được như ý? Hay vẫn là tương tư thành nắm tro tàn?\r\n\r\nTháng ngày như nước chảy mây bay,\r\n\r\nNgười tưởng dấu yêu nhất,\r\n\r\nChuyện tưởng khó quên nhất,\r\n\r\nThời khắc ngọt ngào nhất.",
        "public": true,
        "publish_date": "2015",
        "author": "Tuyết Ảnh Sương Hồn",
        "amount": 500,
        "number_of_page": 500,
        "sold": 1,
        "rating": 5,
        "price": 100000,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/flashmagazine/images/page_images/tuong_tu_thanh_nam_tro_tan___tap_2/2021_08_23_11_32_04_1-390x510.jpg",
        "slug": "tuong-tu-thanh-nam-tro-tan-tap-2",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 10,
            "name": "NGÔN TÌNH",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 294,
        "name": "Họa Đến Rồi Mời Thanh Toán",
        "description": " Thông tin tác giả:\r\n\r\nNgô Đồng Tư Ngữ sinh ra tại vùng Đông Bắc, tốt nghiệp chuyên ngành Tài chính ngân hàng tại Giang Nam. Cô là một Thiên Yết điển hình, từ nhỏ đã mơ trở thành một hiệp khách giang hồ, hành hiệp trượng nghĩa; luôn mơ rằng sẽ có một bạch mã hoàng tử đạp trên cỏ non và lá xanh đến tìm mình.\r\n\r\nThông tin tác phẩm:\r\n\r\nNhà vật Lý học độc miệng – Cận Hoài Lý – vì cố chấp đã quyết tâm mua một cái nồi áp suất qua kênh mua sắm trên tivi, kết quả lại được tặng kèm thêm một cô vợ hay lệch nhịp.\r\n\r\nNguyễn Lập Đông kêu gào khẩu hiệu của họ: Đưa họa tới nhà, thanh toán tại chỗ, chất lượng đảm bảo, diệt trừ tận gốc.\r\n\r\nKhi Cận Hoài Lý tháo rời phần điốt bán dẫn ra, bèn liếc xéo Nguyễn Lập Đông: “Anh giống sát thủ lắm hả”.\r\n\r\nNguyễn Lập Đông lắc đầu: “Anh là kẻ đầu sỏ”.\r\n\r\nMã hàng\t9786048992446\r\nTên Nhà Cung Cấp\tBách Việt\r\nTác giả\tNgô Đồng Tư Ngữ\r\nNgười Dịch\tTô Ngọc Hà\r\nNXB\tNXB Hồng Đức\r\nNăm XB\t2019\r\nTrọng lượng (gr)\t520\r\nKích Thước Bao Bì\t14.5 x 20.5 cm x 2.5\r\nSố trang\t512\r\nHình thức\tBìa Mềm\r\nSản phẩm hiển thị trong\t\r\nBách Việt\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Ngôn Tình bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\n Thông tin tác giả:\r\n\r\nNgô Đồng Tư Ngữ sinh ra tại vùng Đông Bắc, tốt nghiệp chuyên ngành Tài chính ngân hàng tại Giang Nam. Cô là một Thiên Yết điển hình, từ nhỏ đã mơ trở thành một hiệp khách giang hồ, hành hiệp trượng nghĩa; luôn mơ rằng sẽ có một bạch mã hoàng tử đạp trên cỏ non và lá xanh đến tìm mình.\r\n\r\nThông tin tác phẩm:\r\n\r\nNhà vật Lý học độc miệng – Cận Hoài Lý – vì cố chấp đã quyết tâm mua một cái nồi áp suất qua kênh mua sắm trên tivi, kết quả lại được tặng kèm thêm một cô vợ hay lệch nhịp.\r\n\r\nNguyễn Lập Đông kêu gào khẩu hiệu của họ: Đưa họa tới nhà, thanh toán tại chỗ, chất lượng đảm bảo, diệt trừ tận gốc.\r\n\r\nKhi Cận Hoài Lý tháo rời phần điốt bán dẫn ra, bèn liếc xéo Nguyễn Lập Đông: “Anh giống sát thủ lắm hả”.\r\n\r\nNguyễn Lập Đông lắc đầu: “Anh là kẻ đầu sỏ”.",
        "public": true,
        "publish_date": "2018",
        "author": "Ngô Đồng Tư Ngữ",
        "amount": 512,
        "number_of_page": 512,
        "sold": 1,
        "rating": 5,
        "price": 109000,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_7950.jpg",
        "slug": "hoa-den-roi-moi-thanh-toan",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 10,
            "name": "NGÔN TÌNH",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 295,
        "name": "Nửa Đường Xuất Giá",
        "description": "Thượng đế thật lạ kì, trước khi để chúng ta gặp được người có duyên lại khiến ta gặp những người không thể ở bên ta mãi. Cuối cùng trên đường đời bao người qua lại ta mới nhận ra ai là một nửa của mình, chỉ bởi tình yêu bỗng chốc le lói trong tim.",
        "public": true,
        "publish_date": "2015",
        "author": "Nam Nan",
        "amount": 312,
        "number_of_page": 412,
        "sold": 1,
        "rating": 5,
        "price": 92650,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/8/9/8936041686144_2.jpg",
        "slug": "nua-duong-xuat-gia",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 10,
            "name": "NGÔN TÌNH",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 296,
        "name": "Ma Quỷ Dân Gian Ký",
        "description": "“MA QUỶ DÂN GIAN KÝ” - KHI MA QUỶ VIỆT NAM CHÍNH THỨC ĐƯỢC ĐƯA VÀO TRANG SÁCH\r\n\r\nCuốn sách “Ma quỷ dân gian ký” là một trong số ít những công trình hiếm hoi đề cập đến những câu chuyện về ma quỷ được truyền miệng văn hóa dân gian Việt Nam, không chỉ là trong văn hóa của dân tộc Việt mà còn trong văn hóa của những dân tộc thiểu số khác ở nhiều vùng miền.\r\n\r\nKhác với văn hoá Phương Tây, các giai thoại về ma quỷ ở văn hoá Phương Đông - đặc biệt là Việt Nam thường cho thấy ma quỷ gần gũi với con người hơn. Thường ma “xuất thân” từ những linh hồn của người đã khuất, hoặc một biến đổi về tâm linh với những loài vật quen thuộc đang sống. Chính vì vậy, trong văn hoá Việt Nam các vùng miền, ma quỷ xuất hiện nhiều trong những câu chuyện, tin đồn dân gian, thường để giải trí, hoặc doạ nạt, nhưng phía sau là giáo huấn, răn dạy người khác phải tôn trọng những vùng đất, thiên nhiên hoặc mộ phần của người đã mất. Và phía sau ma quỷ, là những tâm tình, những thói quen, quan niệm về tự nhiên, về lẽ phải của người Việt trong đời sống sinh hoạt hằng ngày. Song, từ trước đến nay, chưa có một khảo cứu đầy đủ nào về ma quỷ ở Việt Nam, cho đến khi “Ma Quỷ Dân Gian Ký” ra đời.\r\n\r\nTác phẩm là một bộ sách du khảo tập hợp các loài ma quỷ và hiện tượng tâm linh trong văn hoá truyền miệng ở Việt Nam, được chia làm các chương nhỏ, đi kèm với tranh vẽ theo phong cách dân gian hiện đại. Mỗi chương sẽ gồm một chủ đề, với minh hoạ sống động và những thông tin đầy đủ về định nghĩa, đặc tính và niềm tin dân gian về các loại ma quỷ. Cuối sách là phần phụ lục các sáng tác thơ truyện liên quan đến ma quỷ dân gian.\r\n\r\nHoạ sỹ Duy Văn và các cộng sự đã cất công sưu tầm những truyện xưa tích cũ từ trong sách vở, các chuyến điền dã và cả từ hiểu biết của những người xung quanh. Kể từ đó, anh lập nên một bảng danh sách các loài ma quỷ và hiện tượng tâm linh ở Việt Nam. Điểm đặc biệt là Duy Văn đã thổi một hồn cốt dân gian qua những nét vẽ kết hợp lối vẽ doodle và tranh dân gian. Trong lời giới thiệu, tác giả cho biết động lực lớn nhất của anh là để phát huy một nét văn hoá đã tồn tại từ lâu, nhưng thường đi theo những cấm kị, không được công nhận đúng mức; trong khi các nước châu Á như Nhật Bản, Thái Lan, Trung Quốc đều có những sự bảo tồn với văn hoá ma quỷ của họ thông qua các hình thức diễn trình, hoặc khai thác làm phim ảnh, thương mại.\r\n\r\n“Không những các sản phẩm từ trí tưởng tượng, mà cả những con ma thật được đưa vào chuyện dân gian đều có ý nghĩa riêng đặc biệt. Không biết tự bao giờ “con không ăn là Ông Kẹ tới bắt”, “trên cây dừa có ma tóc dài đánh du, đi chơi khuya là bị nó bắt”, “không ra tắm sông giữa trưa, không con ma da nó lôi chân”… còn nhiều những câu chuyện nữa gắn liền với những câu nói cửa miệng mà thuở nhỏ chắc hẳn nhiều người hay nghe.\r\n\r\nÔng bà ta dùng những hình ảnh ma quỷ để răn dạy con cháu một cách khéo léo. Thuở xưa nạn bắt cóc nhiều người ta nghĩ ra ông ba bị để con cái ngoan ngoãn ở nhà, không quấy phá. Nếu đời sống thôn quê có nhiều thành phần tiểu tiện bừa bãi mà không xử lí, chúng ta có Ma Lai, sẽ ăn phân và gây chết do đứt ruột. Từ đó mọi người chú ý giữ vệ sinh hơn. Đó chính là ý nghĩa nhân văn của ma quỷ trong dân gian.” - Hoạ sỹ Duy Văn tâm sự.\r\n\r\nĐây sẽ là một bộ sách tiên phong về lĩnh vực vừa quen vừa mới lạ với văn hoá Việt. Đặc biệt sẽ là nguồn tham khảo cực kì phong phú và đáng giá cho những cá nhân, tập thể làm các dự án sáng tạo ở Việt Nam, như nhà văn Di Li nhận xét: “Ma Quỷ Dân Gian Ký không chỉ là một cuốn sách để đọc, để cảm thấy thú vị mà còn là tư liệu tốt cho những nhà văn đang viết truyện kinh dị, hoặc các thể loại văn học có yếu tố huyền ảo”.\r\n\r\nMã hàng\t8936213490357\r\nTác giả\tDuy Văn\r\nNXB\tHội Nhà Văn\r\nNăm XB\t2023\r\nNgôn Ngữ\tTiếng Việt\r\nTrọng lượng (gr)\t320\r\nKích Thước Bao Bì\t21.5 x 17 x 1 cm\r\nSố trang\t260\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Truyện Trinh Thám - Kiếm Hiệp bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\n“MA QUỶ DÂN GIAN KÝ” - KHI MA QUỶ VIỆT NAM CHÍNH THỨC ĐƯỢC ĐƯA VÀO TRANG SÁCH\r\n\r\nCuốn sách “Ma quỷ dân gian ký” là một trong số ít những công trình hiếm hoi đề cập đến những câu chuyện về ma quỷ được truyền miệng văn hóa dân gian Việt Nam, không chỉ là trong văn hóa của dân tộc Việt mà còn trong văn hóa của những dân tộc thiểu số khác ở nhiều vùng miền.\r\n\r\nKhác với văn hoá Phương Tây, các giai thoại về ma quỷ ở văn hoá Phương Đông - đặc biệt là Việt Nam thường cho thấy ma quỷ gần gũi với con người hơn. Thường ma “xuất thân” từ những linh hồn của người đã khuất, hoặc một biến đổi về tâm linh với những loài vật quen thuộc đang sống. Chính vì vậy, trong văn hoá Việt Nam các vùng miền, ma quỷ xuất hiện nhiều trong những câu chuyện, tin đồn dân gian, thường để giải trí, hoặc doạ nạt, nhưng phía sau là giáo huấn, răn dạy người khác phải tôn trọng những vùng đất, thiên nhiên hoặc mộ phần của người đã mất. Và phía sau ma quỷ, là những tâm tình, những thói quen, quan niệm về tự nhiên, về lẽ phải của người Việt trong đời sống sinh hoạt hằng ngày. Song, từ trước đến nay, chưa có một khảo cứu đầy đủ nào về ma quỷ ở Việt Nam, cho đến khi “Ma Quỷ Dân Gian Ký” ra đời.\r\n\r\nTác phẩm là một bộ sách du khảo tập hợp các loài ma quỷ và hiện tượng tâm linh trong văn hoá truyền miệng ở Việt Nam, được chia làm các chương nhỏ, đi kèm với tranh vẽ theo phong cách dân gian hiện đại. Mỗi chương sẽ gồm một chủ đề, với minh hoạ sống động và những thông tin đầy đủ về định nghĩa, đặc tính và niềm tin dân gian về các loại ma quỷ. Cuối sách là phần phụ lục các sáng tác thơ truyện liên quan đến ma quỷ dân gian.\r\n\r\nHoạ sỹ Duy Văn và các cộng sự đã cất công sưu tầm những truyện xưa tích cũ từ trong sách vở, các chuyến điền dã và cả từ hiểu biết của những người xung quanh. Kể từ đó, anh lập nên một bảng danh sách các loài ma quỷ và hiện tượng tâm linh ở Việt Nam. Điểm đặc biệt là Duy Văn đã thổi một hồn cốt dân gian qua những nét vẽ kết hợp lối vẽ doodle và tranh dân gian. Trong lời giới thiệu, tác giả cho biết động lực lớn nhất của anh là để phát huy một nét văn hoá đã tồn tại từ lâu, nhưng thường đi theo những cấm kị, không được công nhận đúng mức; trong khi các nước châu Á như Nhật Bản, Thái Lan, Trung Quốc đều có những sự bảo tồn với văn hoá ma quỷ của họ thông qua các hình thức diễn trình, hoặc khai thác làm phim ảnh, thương mại.\r\n\r\n“Không những các sản phẩm từ trí tưởng tượng, mà cả những con ma thật được đưa vào chuyện dân gian đều có ý nghĩa riêng đặc biệt. Không biết tự bao giờ “con không ăn là Ông Kẹ tới bắt”, “trên cây dừa có ma tóc dài đánh du, đi chơi khuya là bị nó bắt”, “không ra tắm sông giữa trưa, không con ma da nó lôi chân”… còn nhiều những câu chuyện nữa gắn liền với những câu nói cửa miệng mà thuở nhỏ chắc hẳn nhiều người hay nghe.\r\n\r\nÔng bà ta dùng những hình ảnh ma quỷ để răn dạy con cháu một cách khéo léo. Thuở xưa nạn bắt cóc nhiều người ta nghĩ ra ông ba bị để con cái ngoan ngoãn ở nhà, không quấy phá. Nếu đời sống thôn quê có nhiều thành phần tiểu tiện bừa bãi mà không xử lí, chúng ta có Ma Lai, sẽ ăn phân và gây chết do đứt ruột. Từ đó mọi người chú ý giữ vệ sinh hơn. Đó chính là ý nghĩa nhân văn của ma quỷ trong dân gian.” - Hoạ sỹ Duy Văn tâm sự.\r\n\r\nĐây sẽ là một bộ sách tiên phong về lĩnh vực vừa quen vừa mới lạ với văn hoá Việt. Đặc biệt sẽ là nguồn tham khảo cực kì phong phú và đáng giá cho những cá nhân, tập thể làm các dự án sáng tạo ở Việt Nam, như nhà văn Di Li nhận xét: “Ma Quỷ Dân Gian Ký không chỉ là một cuốn sách để đọc, để cảm thấy thú vị mà còn là tư liệu tốt cho những nhà văn đang viết truyện kinh dị, hoặc các thể loại văn học có yếu tố huyền ảo”.",
        "public": true,
        "publish_date": "2023",
        "author": "Duy Văn",
        "amount": 260,
        "number_of_page": 260,
        "sold": 1,
        "rating": 5,
        "price": 227800,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/8/9/8936213490357.jpg",
        "slug": "ma-quy-dan-gian-ky",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 11,
            "name": "TRINH THÁM ",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 297,
        "name": "Bóng Ma Trên Phố Ginza",
        "description": "Bóng Ma Trên Phố Ginza\r\n\r\nMột chiếc xe biến mất bí ẩn trên làn đường thu phí. Một cái chết bất thường của anh chàng họa sĩ trường phái Tây phương. Một bức tường đá ma quái che giấu tội ác. Một nữ nhân viên phục vụ bị cắt đứt cổ họng. Ba kẻ tâm thần liên quan đến cái chết thảm khốc của vị bác sĩ. Một cái xác với dấu hiệu siết cổ quái dị. Một người đàn ông bị hồn ma người vợ cũ giết chết. Một ngọn hải đăng với thi thể dập nát bên trên phòng đèn.\r\n\r\nTám câu chuyện là tám tội ác tưởng chừng bất khả thi, nhưng tất cả đều là những mánh khóe và thủ đoạn của con người, núp bóng ma quỷ để che giấu hành vi phạm tội. Ngòi bút tài hoa của nhà văn trinh thám Osaka Keikichi đã vạch trần những góc tối trong tâm lý con người, đưa người đọc đi tới mọi ngóc ngách để chứng kiến hành trình tội ác đầy bí ẩn. Là một tác phẩm trinh thám cổ điển, BÓNG MA TRÊN PHỐ GINZA hoàn toàn làm thỏa mãn người đọc với những suy luận logic và tài tình trong mỗi câu chuyện.\r\n\r\nMã hàng\t8935325010583\r\nTên Nhà Cung Cấp\tAZ Việt Nam\r\nTác giả\tOsaka Keikichi\r\nNgười Dịch\tAnnie, Xuân Sinh\r\nNXB\tThanh Niên\r\nNăm XB\t2023\r\nNgôn Ngữ\tTiếng Việt\r\nTrọng lượng (gr)\t250\r\nKích Thước Bao Bì\t20.5 x 14.5 x 1.1 cm\r\nSố trang\t216\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Truyện Trinh Thám - Kiếm Hiệp bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nBóng Ma Trên Phố Ginza\r\n\r\nMột chiếc xe biến mất bí ẩn trên làn đường thu phí. Một cái chết bất thường của anh chàng họa sĩ trường phái Tây phương. Một bức tường đá ma quái che giấu tội ác. Một nữ nhân viên phục vụ bị cắt đứt cổ họng. Ba kẻ tâm thần liên quan đến cái chết thảm khốc của vị bác sĩ. Một cái xác với dấu hiệu siết cổ quái dị. Một người đàn ông bị hồn ma người vợ cũ giết chết. Một ngọn hải đăng với thi thể dập nát bên trên phòng đèn.\r\n\r\nTám câu chuyện là tám tội ác tưởng chừng bất khả thi, nhưng tất cả đều là những mánh khóe và thủ đoạn của con người, núp bóng ma quỷ để che giấu hành vi phạm tội. Ngòi bút tài hoa của nhà văn trinh thám Osaka Keikichi đã vạch trần những góc tối trong tâm lý con người, đưa người đọc đi tới mọi ngóc ngách để chứng kiến hành trình tội ác đầy bí ẩn. Là một tác phẩm trinh thám cổ điển, BÓNG MA TRÊN PHỐ GINZA hoàn toàn làm thỏa mãn người đọc với những suy luận logic và tài tình trong mỗi câu chuyện.\r\n\r\n",
        "public": true,
        "publish_date": "2022",
        "author": "Bóng Ma Trên Phố Ginza\r\n\r\nMột chiếc xe biến mất bí",
        "amount": 216,
        "number_of_page": 216,
        "sold": 1,
        "rating": 5,
        "price": 74800,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1-b_ng-ma-tr_n-ph_-ginza-600.jpg",
        "slug": "bong-ma-tren-pho-ginza",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 11,
            "name": "TRINH THÁM ",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 298,
        "name": "Vườn Hoa Mạt Dược Ký Sự - Những Kỳ Án Nổi Tiếng Chưa Có Lời Giải (Tái Bản)",
        "description": "Vườn Hoa Mạt Dược Ký Sự - Những Kỳ Án Nổi Tiếng Chưa Có Lời Giải\r\n\r\nTừ những thước phim tài liệu của Netflix, cho tới những tài liệu mật chỉ được thẩm tra nhằm phục vụ cho quá trình phá án, “Vườn Hoa Mạt Dược” đã lần lượt thu thập và đăng tải hồ sơ về mười lăm kỳ án trên thế giới. Phần lớn trong số đó là các vụ án chưa tìm được lời giải sau nhiều năm điều tra.\r\n\r\nMười lăm vụ án được phân tích trong bộ hồ sơ trinh thám này là mười lăm kỳ án mà thế giới không bao giờ quên.\r\n\r\nAi đã làm điều đó?\r\n\r\nHọ đã làm điều đó như thế nào?\r\n\r\n“Tôi mong ý nghĩa tồn tại của “Vườn Hoa Mạt Dược” không hạn chế trong việc tìm ra đáp án cho các vụ án chưa có lời giải và những sự kiện thần bí. Tôi hy vọng mình có thể cung cấp một bản mẫu phân tích logic ở góc độ và phương diện lý trí để độc giả nhìn nhận các sự kiện xã hội. Còn đáp án cụ thể, thực ra mỗi người chúng ta đều có thể có những suy luận của riêng mình nên chỉ cần hợp logic là được.” – Trích lời tác giả.\r\n\r\nMã hàng\t9786043459326\r\nTên Nhà Cung Cấp\tAZ Việt Nam\r\nTác giả\tHà Mạt Bì\r\nNgười Dịch\tLosedow\r\nNXB\tNXB Thế Giới\r\nNăm XB\t2022\r\nNgôn Ngữ\tTiếng Việt\r\nTrọng lượng (gr)\t450\r\nKích Thước Bao Bì\t20.5 x 14.5 cm x 2\r\nSố trang\t400\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Truyện Trinh Thám - Kiếm Hiệp bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nVườn Hoa Mạt Dược Ký Sự - Những Kỳ Án Nổi Tiếng Chưa Có Lời Giải\r\n\r\nTừ những thước phim tài liệu của Netflix, cho tới những tài liệu mật chỉ được thẩm tra nhằm phục vụ cho quá trình phá án, “Vườn Hoa Mạt Dược” đã lần lượt thu thập và đăng tải hồ sơ về mười lăm kỳ án trên thế giới. Phần lớn trong số đó là các vụ án chưa tìm được lời giải sau nhiều năm điều tra.\r\n\r\nMười lăm vụ án được phân tích trong bộ hồ sơ trinh thám này là mười lăm kỳ án mà thế giới không bao giờ quên.\r\n\r\nAi đã làm điều đó?\r\n\r\nHọ đã làm điều đó như thế nào?\r\n\r\n“Tôi mong ý nghĩa tồn tại của “Vườn Hoa Mạt Dược” không hạn chế trong việc tìm ra đáp án cho các vụ án chưa có lời giải và những sự kiện thần bí. Tôi hy vọng mình có thể cung cấp một bản mẫu phân tích logic ở góc độ và phương diện lý trí để độc giả nhìn nhận các sự kiện xã hội. Còn đáp án cụ thể, thực ra mỗi người chúng ta đều có thể có những suy luận của riêng mình nên chỉ cần hợp logic là được.” – Trích lời tác giả.",
        "public": true,
        "publish_date": "1970",
        "author": "Hà Mạt Bì",
        "amount": 400,
        "number_of_page": 400,
        "sold": 1,
        "rating": 5,
        "price": 118500,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/9/7/9786043459326.jpg",
        "slug": "vuon-hoa-mat-duoc-ky-su-nhung-ky-an-noi-tieng-chua-co-loi-giai-tai-ban",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 11,
            "name": "TRINH THÁM ",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 299,
        "name": "Sherlock Holmes Toàn Tập (Trọn Bộ 3 Tập)",
        "description": "Combo Sherlock Holmes Toàn Tập\r\n\r\nSherlock Holmes là một nhân vật thám tử hư cấu vào cuối thể kỉ 19 và đầu thế kỉ 20, xuất hiện lần đầu trong tác phẩm của nhà văn Arthur Conan Doyle xuất bản năm 1887. Ông là một thám tử tư ở Luân Đôn nổi tiếng nhờ trí thông minh, khả năng suy diễn logic và quan sát tinh tường trong khi phá những vụ án mà cảnh sát phải bó tay. Nhiều người cho rằng Sherlock Holmes là nhân vật thám tử hư cấu nổi tiếng nhất trong lịch sử văn học và là một trong những nhân vật văn học được biết đến nhiều nhất toàn thế giới.\r\n\r\nSherlock Holmes đã xuất hiện trong 4 tiểu thuyết và 56 truyện ngắn của nhà văn Conan Doyle. Hầu như tất cả các tác phẩm đều được viết dưới dạng ghi chép của bác sĩ John H. Watson, người bạn thân thiết và người ghi chép tiểu sử của Sherlock Holmes, chỉ có 2 tác phẩm được viết dưới dạng ghi chép của người thứ ba. Hai tác phẩm đầu tiên trong số này là 2 tiểu thuyết ngắn và được xuất hiện lần đầu tiên trên tờ Beeton's Christmas Annual vào năm 1887 và tời Lippincott's Monthly Magazine vào văm 1890. Thám tử Holmes trở nên cực kì nổi tiếng khi loạt truyện ngắn của Conan Doyle được xuất bản trên tạp chí The Strand Magazine năm 1891. Các tác phẩm được viết xoay quanh thời gian từ năm 1878 đến năm 1903 với vụ án cuối cùng vào năm 1914.\r\n\r\nCombo Sherlock Holmes Toàn Tập gồm 3 tập:\r\n\r\nSherlock Holmes Toàn Tập - Tập 1\r\n\r\nSherlock Holmes Toàn Tập - Tập 2\r\n\r\nSherlock Holmes Toàn Tập - Tập 3.\r\n\r\nMã hàng\t8935092541433\r\nNhà Cung Cấp\tCty Văn Hóa Khang Việt\r\nTác giả\tSir Arthur Conan Doyle\r\nNXB\tNXB Hội Nhà Văn\r\nNăm XB\t09-2016\r\nTrọng lượng (gr)\t1500\r\nKích Thước Bao Bì\t24 x 16\r\nSố trang\t1300\r\nHình thức\tBìa Cứng\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Truyện Trinh Thám - Kiếm Hiệp bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nCombo Sherlock Holmes Toàn Tập\r\n\r\nSherlock Holmes là một nhân vật thám tử hư cấu vào cuối thể kỉ 19 và đầu thế kỉ 20, xuất hiện lần đầu trong tác phẩm của nhà văn Arthur Conan Doyle xuất bản năm 1887. Ông là một thám tử tư ở Luân Đôn nổi tiếng nhờ trí thông minh, khả năng suy diễn logic và quan sát tinh tường trong khi phá những vụ án mà cảnh sát phải bó tay. Nhiều người cho rằng Sherlock Holmes là nhân vật thám tử hư cấu nổi tiếng nhất trong lịch sử văn học và là một trong những nhân vật văn học được biết đến nhiều nhất toàn thế giới.\r\n\r\nSherlock Holmes đã xuất hiện trong 4 tiểu thuyết và 56 truyện ngắn của nhà văn Conan Doyle. Hầu như tất cả các tác phẩm đều được viết dưới dạng ghi chép của bác sĩ John H. Watson, người bạn thân thiết và người ghi chép tiểu sử của Sherlock Holmes, chỉ có 2 tác phẩm được viết dưới dạng ghi chép của người thứ ba. Hai tác phẩm đầu tiên trong số này là 2 tiểu thuyết ngắn và được xuất hiện lần đầu tiên trên tờ Beeton's Christmas Annual vào năm 1887 và tời Lippincott's Monthly Magazine vào văm 1890. Thám tử Holmes trở nên cực kì nổi tiếng khi loạt truyện ngắn của Conan Doyle được xuất bản trên tạp chí The Strand Magazine năm 1891. Các tác phẩm được viết xoay quanh thời gian từ năm 1878 đến năm 1903 với vụ án cuối cùng vào năm 1914.\r\n\r\nCombo Sherlock Holmes Toàn Tập gồm 3 tập:\r\n\r\nSherlock Holmes Toàn Tập - Tập 1\r\n\r\nSherlock Holmes Toàn Tập - Tập 2\r\n\r\nSherlock Holmes Toàn Tập - Tập 3.",
        "public": true,
        "publish_date": "2016",
        "author": "Sir Arthur Conan Doyle",
        "amount": 1300,
        "number_of_page": 1300,
        "sold": 1,
        "rating": 5,
        "price": 255000,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/i/m/image_117654.jpg",
        "slug": "sherlock-holmes-toan-tap-tron-bo-3-tap",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 11,
            "name": "TRINH THÁM ",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 300,
        "name": "Cô Hầu Gái",
        "description": "Cô Hầu Gái\r\n\r\n“Chào mừng đến với gia đình,” Nina Winchester vừa nói vừa bắt tay tôi bằng đôi bàn tay thon thả của cô ấy. Tôi mỉm cười lịch sự, nhìn quanh hành lang lát đá cẩm thạch. Làm việc ở đây là cơ hội cuối cùng để tôi bắt đầu lại. Tôi có thể giả vờ là bất cứ ai tôi thích. Nhưng tôi sẽ sớm biết rằng bí mật của nhà Winchester nguy hiểm hơn nhiều so với bí mật của tôi…\r\n\r\nMỗi ngày tôi đều lau dọn ngôi nhà xinh đẹp của nhà Winchester từ trên xuống dưới. Tôi đón con gái họ từ trường và nấu một bữa ăn ngon cho gia đình họ trước khi trở về căn phòng nhỏ trên gác mái để ăn một mình.\r\n\r\nTôi cố phớt lờ việc Nina bày bừa mỗi ngày chỉ để quan sát tôi dọn dẹp, việc cô ấy nói dối về con gái mình, và việc chồng cô – Andrew – có vẻ suy sụp hơn mỗi ngày. Nhưng khi tôi nhìn vào đôi mắt nâu quyến rũ nhưng đượm buồn của Andrew, thật khó để không tưởng tượng về cuộc sống của Nina.\r\n\r\nCó một lần, tôi thử mặc một trong những chiếc váy trắng tinh khôi của Nina, chỉ để xem nó như thế nào. Nhưng cô ấy sớm phát hiện … và khi tôi nhận ra cửa phòng ngủ trên gác mái của mình chỉ khóa từ bên ngoài thì đã quá muộn.\r\n\r\nTôi tự trấn an mình: nhà Winchester không biết tôi thực sự là ai.\r\n\r\nHọ không biết tôi có khả năng gì…\r\n\r\nMã hàng\t8935325013959\r\nTên Nhà Cung Cấp\tAZ Việt Nam\r\nTác giả\tFreida McFadden\r\nNgười Dịch\tMai Trang\r\nNXB\tVăn Học\r\nNăm XB\t2023\r\nTrọng lượng (gr)\t455\r\nKích Thước Bao Bì\t20.5 x 14.5 x 1.5 cm\r\nSố trang\t428\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Truyện Trinh Thám - Kiếm Hiệp bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nCô Hầu Gái\r\n\r\n“Chào mừng đến với gia đình,” Nina Winchester vừa nói vừa bắt tay tôi bằng đôi bàn tay thon thả của cô ấy. Tôi mỉm cười lịch sự, nhìn quanh hành lang lát đá cẩm thạch. Làm việc ở đây là cơ hội cuối cùng để tôi bắt đầu lại. Tôi có thể giả vờ là bất cứ ai tôi thích. Nhưng tôi sẽ sớm biết rằng bí mật của nhà Winchester nguy hiểm hơn nhiều so với bí mật của tôi…\r\n\r\nMỗi ngày tôi đều lau dọn ngôi nhà xinh đẹp của nhà Winchester từ trên xuống dưới. Tôi đón con gái họ từ trường và nấu một bữa ăn ngon cho gia đình họ trước khi trở về căn phòng nhỏ trên gác mái để ăn một mình.\r\n\r\nTôi cố phớt lờ việc Nina bày bừa mỗi ngày chỉ để quan sát tôi dọn dẹp, việc cô ấy nói dối về con gái mình, và việc chồng cô – Andrew – có vẻ suy sụp hơn mỗi ngày. Nhưng khi tôi nhìn vào đôi mắt nâu quyến rũ nhưng đượm buồn của Andrew, thật khó để không tưởng tượng về cuộc sống của Nina.\r\n\r\nCó một lần, tôi thử mặc một trong những chiếc váy trắng tinh khôi của Nina, chỉ để xem nó như thế nào. Nhưng cô ấy sớm phát hiện … và khi tôi nhận ra cửa phòng ngủ trên gác mái của mình chỉ khóa từ bên ngoài thì đã quá muộn.\r\n\r\nTôi tự trấn an mình: nhà Winchester không biết tôi thực sự là ai.\r\n\r\nHọ không biết tôi có khả năng gì…",
        "public": true,
        "publish_date": "2022",
        "author": "Freida McFadden",
        "amount": 455,
        "number_of_page": 455,
        "sold": 264,
        "rating": 5,
        "price": 145800,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/8/9/8935325013959.jpg",
        "slug": "co-hau-gai",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-10T03:47:46.697Z",
        "category": {
            "id": 11,
            "name": "TRINH THÁM ",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 301,
        "name": "Búp Bê - Pháp Y Tần Minh",
        "description": "Búp Bê - Pháp Y Tần Minh\r\n\r\nChúng sinh đều đeo mặt nạ, chỉ trong một ý niệm, người liền biến thành thú.\r\n\r\nTrong tòa nhà dân cư, một cô gái sau khi không còn nghe thấy tiếng cãi vã của nhà hàng xóm, chợt nghe thấy tiếng rơi nặng trịch từ bên dưới chân tòa vọng tới.\r\n\r\nVào đêm hè, một người đàn ông mang theo hai chiếc vali hành lý rời khỏi nhà, tung tích của vợ anh ta đến nay vẫn là một ẩn số.\r\n\r\nBên cạnh hồ trong công viên, đôi vợ chồng trẻ nắm tay nhau du thuyền, đột nhiên bèn ngã nhào xuống hồ, và không hề nổi lên trên mặt nước.\r\n\r\n“Nếu như tôi chết, xin hãy điều tra chồng tôi!”\r\n\r\nMột cuốn nhật ký viết đầy những lời dự đoán, trong những con chữ toát ra tâm ý xin cầu cứu, chủ nhân của nó rốt cuộc là ai?\r\n\r\nHai người phụ nữ không rõ tung tích, trải qua 18 năm dõi nhìn nhau từ xa, rốt cuộc họ đã chia sẻ với nhau bí mật gì?\r\n\r\nBạo lực dưới mái nhà, âm thầm lặng lẽ; Bộ xương khô bên dưới lớp da như hình với bóng.\r\n\r\nHoa bên bờ nở rộ trong bóng tối, mặt con búp bê xinh đẹp lạnh tanh.\r\n\r\nThế nhưng nếu chưa nhìn đến cuối cùng, bạn vĩnh viễn không thể nào biết được… bên trong con búp bê ẩn giấu điều gì.\r\n\r\nMã hàng\t9786043725186\r\nTên Nhà Cung Cấp\tCty Sách Cổ Nguyệt\r\nTác giả\tPháp Y Tần Minh\r\nNgười Dịch\tVũ Thị Hà\r\nNXB\tVăn Học\r\nNăm XB\t2022\r\nTrọng lượng (gr)\t571\r\nKích Thước Bao Bì\t24 x 16 x 2.2 cm\r\nSố trang\t447\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Truyện Trinh Thám - Kiếm Hiệp bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nBúp Bê - Pháp Y Tần Minh\r\n\r\nChúng sinh đều đeo mặt nạ, chỉ trong một ý niệm, người liền biến thành thú.\r\n\r\nTrong tòa nhà dân cư, một cô gái sau khi không còn nghe thấy tiếng cãi vã của nhà hàng xóm, chợt nghe thấy tiếng rơi nặng trịch từ bên dưới chân tòa vọng tới.\r\n\r\nVào đêm hè, một người đàn ông mang theo hai chiếc vali hành lý rời khỏi nhà, tung tích của vợ anh ta đến nay vẫn là một ẩn số.\r\n\r\nBên cạnh hồ trong công viên, đôi vợ chồng trẻ nắm tay nhau du thuyền, đột nhiên bèn ngã nhào xuống hồ, và không hề nổi lên trên mặt nước.\r\n\r\n“Nếu như tôi chết, xin hãy điều tra chồng tôi!”\r\n\r\nMột cuốn nhật ký viết đầy những lời dự đoán, trong những con chữ toát ra tâm ý xin cầu cứu, chủ nhân của nó rốt cuộc là ai?\r\n\r\nHai người phụ nữ không rõ tung tích, trải qua 18 năm dõi nhìn nhau từ xa, rốt cuộc họ đã chia sẻ với nhau bí mật gì?\r\n\r\nBạo lực dưới mái nhà, âm thầm lặng lẽ; Bộ xương khô bên dưới lớp da như hình với bóng.\r\n\r\nHoa bên bờ nở rộ trong bóng tối, mặt con búp bê xinh đẹp lạnh tanh.\r\n\r\nThế nhưng nếu chưa nhìn đến cuối cùng, bạn vĩnh viễn không thể nào biết được… bên trong con búp bê ẩn giấu điều gì.",
        "public": true,
        "publish_date": "2021",
        "author": "Pháp Y Tần Minh",
        "amount": 447,
        "number_of_page": 447,
        "sold": 1,
        "rating": 5,
        "price": 169000,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/9/7/9786043725186.jpg",
        "slug": "bup-be-phap-y-tan-minh",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 11,
            "name": "TRINH THÁM ",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 302,
        "name": "Thôn Tám Mộ",
        "description": "hôn Tám Mộ\r\n\r\nKết thúc Thế chiến 2, Tatsuya xuất ngũ về lại thành phố quê hương, không còn người thân, không xu dính túi, công việc bấp bênh. Bất thần anh nghe trên đài phát tin gia đình giàu có thất lạc từ lâu đang tìm mình.\r\n\r\nTatsuya bèn đến nơi gửi tin, gặp được người thân đầu tiên chừng vài phút thì người này mất mạng trước mắt anh.\r\n\r\nTatsuya về thôn làng mình chào đời, sang hôm sau thì người thân thứ hai mất mạng trước mắt anh.\r\n\r\nSau đó, cứ một vài hôm lại thêm một người mất mạng trước mắt Tatsuya. Anh nghiễm nhiên biến thành kẻ tình nghi lớn nhất, thành kẻ gieo rắc tai ương trong thôn. Tatsuya đi từ ngạc nhiên đến kinh hoàng, khi phát hiện ra đây là nhân quả của tội nghiệt do tổ tiên mình để lại.\r\n\r\nChẳng là gần bốn trăm năm trước, có tám samurai mang vàng đến đây lánh nạn đã bị tổ tiên anh dẫn thôn dân đến bao vây hạ sát. Trước khi bị chặt đầu, vị thủ lĩnh samurai đã nguyền rằng sẽ ếm nguyền bảy đời cho thôn này không thể sống yên ổn.\r\n\r\nTừ đó cho đến tận đời cha anh, mỗi thế hệ trong thôn đều xảy ra một vụ thảm sát, số nạn nhân đều là bội số của 8, như thể lấy mạng để đền tội cho tám samurai chết oan thuở nào.\r\n\r\nGiữa lúc Tatsuya nhớn nhác như kiến bò chảo nóng, anh tình cờ gặp được thám tử Kindaichi Kosuke đang nghỉ chơi ở thôn. Và mỗi người một đường, họ đã đến chung một đích khi khám phá ra bí ẩn thực sự của án mạng hàng loạt mang màu sắc truyền thuyết này.\r\n\r\nTHÔN TÁM MỘ là bản phối hoàn hảo của phiêu lưu, bí ẩn, mê tín, cùng điểm mạnh nổi trội là kĩ thuật phân tầng chân tướng điêu luyện, và khắc họa cá tính nhân vật rất rõ ràng cùng các bí mật bất tận họ sở hữu, không một ai bị đưa ra chỉ để dệt cho đủ mắt trên tấm lưới nạn nhân.\r\n\r\nMã hàng\t8935250708074\r\nTên Nhà Cung Cấp\tIPM\r\nTác giả\tYokomizo Seishi\r\nNgười Dịch\tLê Hồng Minh\r\nNXB\tNXB Hồng Đức\r\nNăm XB\t2022\r\nNgôn Ngữ\tTiếng Việt\r\nTrọng lượng (gr)\t300\r\nKích Thước Bao Bì\t20.5 x 13.5 cm\r\nSố trang\t360\r\nHình thức\tBìa Mềm\r\nSản phẩm hiển thị trong\t\r\nIPM\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Truyện Trinh Thám - Kiếm Hiệp bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nThôn Tám Mộ\r\n\r\nKết thúc Thế chiến 2, Tatsuya xuất ngũ về lại thành phố quê hương, không còn người thân, không xu dính túi, công việc bấp bênh. Bất thần anh nghe trên đài phát tin gia đình giàu có thất lạc từ lâu đang tìm mình.\r\n\r\nTatsuya bèn đến nơi gửi tin, gặp được người thân đầu tiên chừng vài phút thì người này mất mạng trước mắt anh.\r\n\r\nTatsuya về thôn làng mình chào đời, sang hôm sau thì người thân thứ hai mất mạng trước mắt anh.\r\n\r\nSau đó, cứ một vài hôm lại thêm một người mất mạng trước mắt Tatsuya. Anh nghiễm nhiên biến thành kẻ tình nghi lớn nhất, thành kẻ gieo rắc tai ương trong thôn. Tatsuya đi từ ngạc nhiên đến kinh hoàng, khi phát hiện ra đây là nhân quả của tội nghiệt do tổ tiên mình để lại.\r\n\r\nChẳng là gần bốn trăm năm trước, có tám samurai mang vàng đến đây lánh nạn đã bị tổ tiên anh dẫn thôn dân đến bao vây hạ sát. Trước khi bị chặt đầu, vị thủ lĩnh samurai đã nguyền rằng sẽ ếm nguyền bảy đời cho thôn này không thể sống yên ổn.\r\n\r\nTừ đó cho đến tận đời cha anh, mỗi thế hệ trong thôn đều xảy ra một vụ thảm sát, số nạn nhân đều là bội số của 8, như thể lấy mạng để đền tội cho tám samurai chết oan thuở nào.\r\n\r\nGiữa lúc Tatsuya nhớn nhác như kiến bò chảo nóng, anh tình cờ gặp được thám tử Kindaichi Kosuke đang nghỉ chơi ở thôn. Và mỗi người một đường, họ đã đến chung một đích khi khám phá ra bí ẩn thực sự của án mạng hàng loạt mang màu sắc truyền thuyết này.\r\n\r\nTHÔN TÁM MỘ là bản phối hoàn hảo của phiêu lưu, bí ẩn, mê tín, cùng điểm mạnh nổi trội là kĩ thuật phân tầng chân tướng điêu luyện, và khắc họa cá tính nhân vật rất rõ ràng cùng các bí mật bất tận họ sở hữu, không một ai bị đưa ra chỉ để dệt cho đủ mắt trên tấm lưới nạn nhân.\r\n\r\n",
        "public": true,
        "publish_date": "2021",
        "author": "Yokomizo Seishi",
        "amount": 360,
        "number_of_page": 360,
        "sold": 38,
        "rating": 5,
        "price": 114750,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/t/h/thon-tam-mo---bia-1.jpg",
        "slug": "thon-tam-mo",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-10T03:47:46.696Z",
        "category": {
            "id": 11,
            "name": "TRINH THÁM ",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 303,
        "name": "Nàng Tiên Cá",
        "description": "Nàng Tiên Cá\r\n\r\nSau khi gieo mình xuống biển, nàng tiên cá phải chịu đựng ba trăm năm thử thách mới được ban cho linh hồn bất diệt. Nếu nàng gặp được trẻ ngoan, thời gian thử thách rút đi một năm. Chẳng may gặp phải trẻ ác, thử thách lại tăng thêm một ngày.\r\n\r\nNăm 1994 hẳn là năm tăng mạnh thời gian thử thách, bởi năm ấy xuất hiện đến mấy đứa trẻ không thể gọi là ngoan. Những đứa trẻ không ngoan này, vào một ngày nổi cơn dông gió, đã xô một đứa trẻ ngoan rơi xuống cống ngầm. Nhưng khi xoay xở thoát ra khỏi thế giới tối tăm ấy, đứa trẻ ngoan giờ lại khó mà gọi là ngoan được nữa.\r\n\r\nNăm 1994 cũng là năm mà những cơn mưa thường kéo theo tin chẳng lành. Sau một đêm mưa lớn lịch sử, nước xối mạnh trong cống ngầm đã đẩy bật ba cái xác phụ nữ đang phân hủy ra kênh đào. Cảnh sát hình sự lập tức bắt tay vào phá án…\r\n\r\nTrở lại văn đàn sau năm năm gác bút, Lôi Mễ dùng Nàng tiên cá mở ra một vài cảnh trí sinh hoạt bình thường, nhưng lại sử dụng phông nền bình thường ấy để khắc họa những chân dung ở mức độ bất thường cả về thiện và ác.\r\n\r\nMã hàng\t8935250707398\r\nTên Nhà Cung Cấp\tIPM\r\nTác giả\tLôi Mễ\r\nNgười Dịch\tKim\r\nNXB\tNXB Hồng Đức\r\nNăm XB\t2022\r\nNgôn Ngữ\tTiếng Việt\r\nTrọng lượng (gr)\t350\r\nKích Thước Bao Bì\t26 x 15.5 cm\r\nSố trang\t416\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Truyện Trinh Thám - Kiếm Hiệp bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nNàng Tiên Cá\r\n\r\nSau khi gieo mình xuống biển, nàng tiên cá phải chịu đựng ba trăm năm thử thách mới được ban cho linh hồn bất diệt. Nếu nàng gặp được trẻ ngoan, thời gian thử thách rút đi một năm. Chẳng may gặp phải trẻ ác, thử thách lại tăng thêm một ngày.\r\n\r\nNăm 1994 hẳn là năm tăng mạnh thời gian thử thách, bởi năm ấy xuất hiện đến mấy đứa trẻ không thể gọi là ngoan. Những đứa trẻ không ngoan này, vào một ngày nổi cơn dông gió, đã xô một đứa trẻ ngoan rơi xuống cống ngầm. Nhưng khi xoay xở thoát ra khỏi thế giới tối tăm ấy, đứa trẻ ngoan giờ lại khó mà gọi là ngoan được nữa.\r\n\r\nNăm 1994 cũng là năm mà những cơn mưa thường kéo theo tin chẳng lành. Sau một đêm mưa lớn lịch sử, nước xối mạnh trong cống ngầm đã đẩy bật ba cái xác phụ nữ đang phân hủy ra kênh đào. Cảnh sát hình sự lập tức bắt tay vào phá án…\r\n\r\nTrở lại văn đàn sau năm năm gác bút, Lôi Mễ dùng Nàng tiên cá mở ra một vài cảnh trí sinh hoạt bình thường, nhưng lại sử dụng phông nền bình thường ấy để khắc họa những chân dung ở mức độ bất thường cả về thiện và ác.\r\n\r\n",
        "public": true,
        "publish_date": "2021",
        "author": "Lôi Mễ",
        "amount": 416,
        "number_of_page": 416,
        "sold": 67,
        "rating": 5,
        "price": 142800,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/n/a/nang-tien-ca---bia-1.jpg",
        "slug": "nang-tien-ca",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-10T03:47:46.696Z",
        "category": {
            "id": 11,
            "name": "TRINH THÁM ",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 304,
        "name": "Mặt Nạ Trắng - Lời Nguyền Chết Chóc",
        "description": "Mặt nạ trắng\r\n\r\nLời nguyền chết chóc\r\n\r\nVào một đêm mùa đông năm 1944, hai vợ chồng người thợ rèn tên Ơn đã bị ba gã đàn ông đột nhập vào nhà và giết hại một cách hết sức dã man. Ngôi nhà của họ cũng bị thiêu cháy thành tro. Nhưng ngay ngày hôm sau, ba gã tham gia vụ án mạng đó đều lần lượt bỏ mạng bởi những nhát búa đập nát đầu. Dân làng Kẻ Nha đều cho rằng có một người đeo chiếc mặt nạ trắng đã xuất hiện và gây ra những cái chết đó. Ma mị hơn nữa, người ta tin rằng đó chính là hồn ma của người thợ rèn đã quay lại trả thù. Chính vì vậy họ đã lập một ngôi miếu nhỏ để thờ cúng, mong muốn có một cuộc sống bình yên.\r\n\r\nVài chục năm sau, mọi chuyện tưởng như đã trôi vào quên lãng, ngôi miếu cũng đã bị bỏ hoang và không mấy ai còn nhớ đến nữa. Bỗng nhiên, một vụ án mạng xảy ra, nạn nhân được tìm thấy ngay tại khu vực ngôi miếu hoang với cái đầu bị đập vỡ nát. Kẻ đeo mặt nạ trắng đã xuất hiện trở lại và tiếp tục gây xôn xao, khiến dân chúng khắp vùng sợ hãi…\r\n\r\nMặt nạ trắng là một trong ba tiểu thuyết thuộc bộ ba tác phẩm trinh thám của nhà văn Kim Tam Long đã từng được đánh giá cao trong cộng đồng yêu thích truyện trinh thám.\r\n\r\nMã hàng\t8936107812944\r\nTên Nhà Cung Cấp\tCÔNG TY TNHH SÁCH & TRUYỀN THÔNG VIỆT NAM\r\nTác giả\tKim Tam Long\r\nNXB\tNXB Dân Trí\r\nNăm XB\t2022\r\nTrọng lượng (gr)\t479\r\nKích Thước Bao Bì\t20.5 x 14.5 x 2.1 cm\r\nSố trang\t432\r\nHình thức\tBìa Mềm\r\nSản phẩm hiển thị trong\t\r\nCÔNG TY TNHH SÁCH & TRUYỀN THÔNG VIỆT NAM\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Truyện Trinh Thám - Kiếm Hiệp bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nMặt nạ trắng\r\n\r\nLời nguyền chết chóc\r\n\r\nVào một đêm mùa đông năm 1944, hai vợ chồng người thợ rèn tên Ơn đã bị ba gã đàn ông đột nhập vào nhà và giết hại một cách hết sức dã man. Ngôi nhà của họ cũng bị thiêu cháy thành tro. Nhưng ngay ngày hôm sau, ba gã tham gia vụ án mạng đó đều lần lượt bỏ mạng bởi những nhát búa đập nát đầu. Dân làng Kẻ Nha đều cho rằng có một người đeo chiếc mặt nạ trắng đã xuất hiện và gây ra những cái chết đó. Ma mị hơn nữa, người ta tin rằng đó chính là hồn ma của người thợ rèn đã quay lại trả thù. Chính vì vậy họ đã lập một ngôi miếu nhỏ để thờ cúng, mong muốn có một cuộc sống bình yên.\r\n\r\nVài chục năm sau, mọi chuyện tưởng như đã trôi vào quên lãng, ngôi miếu cũng đã bị bỏ hoang và không mấy ai còn nhớ đến nữa. Bỗng nhiên, một vụ án mạng xảy ra, nạn nhân được tìm thấy ngay tại khu vực ngôi miếu hoang với cái đầu bị đập vỡ nát. Kẻ đeo mặt nạ trắng đã xuất hiện trở lại và tiếp tục gây xôn xao, khiến dân chúng khắp vùng sợ hãi…\r\n\r\nMặt nạ trắng là một trong ba tiểu thuyết thuộc bộ ba tác phẩm trinh thám của nhà văn Kim Tam Long đã từng được đánh giá cao trong cộng đồng yêu thích truyện trinh thám.",
        "public": true,
        "publish_date": "2021",
        "author": "Kim Tam Long",
        "amount": 432,
        "number_of_page": 432,
        "sold": 23,
        "rating": 5,
        "price": 152150,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/8/9/8936107812944.jpg",
        "slug": "mat-na-trang-loi-nguyen-chet-choc",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-10T03:47:46.695Z",
        "category": {
            "id": 11,
            "name": "TRINH THÁM ",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 305,
        "name": "Vụ Án Mạng Ở Lữ Quán Kairotel",
        "description": "Một tác phẩm đậm chất trinh thám cổ điển vua trinh thám Nhật Bản Keigo Higashino.\r\n\r\nBản di chúc về khối tài sản kếch xù của ông Ichigahara Takaaki sẽ được công bố vào đúng lễ 49 ngày của ông tại lữ quán Kairotei, nơi sinh thời ông vô cùng yêu mến. Nhưng một lá thư hé lộ sự thật bị chôn vùi dưới lớp tro tàn của vụ hỏa hoạn ở lữ quán này nửa năm trước, xuất hiện đúng buổi tối trước ngày công bố di chúc đã khiến mọi chuyện trở nên rối tung. Cũng trong đêm đó, một người đã bị sát hại. Ngọn lửa ngờ vực bắt đầu âm ỉ cháy lan, một thảm kịch khác đã được soạn sẵn và chờ hồi kết để hạ màn...\r\n\r\nGIỚI THIỆU TÁC GIẢ:\r\nHigashino Keigo là tiểu thuyết gia trinh thám hàng đầu Nhật Bản với nhiều tác phẩm hàng triệu bản bán ra trong và ngoài nước, gặt hái vô vàn giải thưởng. Ông từng là Chủ tịch thứ 13 của Hội nhà văn Trinh thám Nhật Bản từ năm 2009 tới năm 2013.\r\n\r\nMỗi tác phẩm của ông đều có phong cách khác nhau, nhưng nhìn chung đều có diễn biến bất ngờ, khắc họa tâm lý nhân vật sâu sắc, làm nên nét riêng biệt trong chất văn của Higashino Keigo.\r\n\r\nMã hàng\t8935235227064\r\nTên Nhà Cung Cấp\tNhã Nam\r\nTác giả\tHigashlno Kelgo\r\nNgười Dịch\tDã Tràng\r\nNXB\tNXB Hà Nội\r\nNăm XB\t2020\r\nTrọng lượng (gr)\t300\r\nKích Thước Bao Bì\t20.5 x 14 cm\r\nSố trang\t292\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Truyện Trinh Thám - Kiếm Hiệp bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nMột tác phẩm đậm chất trinh thám cổ điển vua trinh thám Nhật Bản Keigo Higashino.\r\n\r\nBản di chúc về khối tài sản kếch xù của ông Ichigahara Takaaki sẽ được công bố vào đúng lễ 49 ngày của ông tại lữ quán Kairotei, nơi sinh thời ông vô cùng yêu mến. Nhưng một lá thư hé lộ sự thật bị chôn vùi dưới lớp tro tàn của vụ hỏa hoạn ở lữ quán này nửa năm trước, xuất hiện đúng buổi tối trước ngày công bố di chúc đã khiến mọi chuyện trở nên rối tung. Cũng trong đêm đó, một người đã bị sát hại. Ngọn lửa ngờ vực bắt đầu âm ỉ cháy lan, một thảm kịch khác đã được soạn sẵn và chờ hồi kết để hạ màn...\r\n\r\nGIỚI THIỆU TÁC GIẢ:\r\nHigashino Keigo là tiểu thuyết gia trinh thám hàng đầu Nhật Bản với nhiều tác phẩm hàng triệu bản bán ra trong và ngoài nước, gặt hái vô vàn giải thưởng. Ông từng là Chủ tịch thứ 13 của Hội nhà văn Trinh thám Nhật Bản từ năm 2009 tới năm 2013.\r\n\r\nMỗi tác phẩm của ông đều có phong cách khác nhau, nhưng nhìn chung đều có diễn biến bất ngờ, khắc họa tâm lý nhân vật sâu sắc, làm nên nét riêng biệt trong chất văn của Higashino Keigo.",
        "public": true,
        "publish_date": "2020",
        "author": "Higashlno Kelgo",
        "amount": 292,
        "number_of_page": 292,
        "sold": 1,
        "rating": 5,
        "price": 104550,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/v/u/vu_an_mang_o_lu_quan_kairotel_1_2020_11_17_15_20_01.jpg",
        "slug": "vu-an-mang-o-lu-quan-kairotel",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 11,
            "name": "TRINH THÁM ",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 306,
        "name": "Sự Trả Thù Hoàn Hảo (Tái Bản 2021)",
        "description": "\"Cam Giai Ninh thời sinh viên vốn được mệnh danh là “Nữ hoàng hóa học”, vì trả thù cho chồng nên cô đã thiết kế ra bom nổ giết chết ba người ở Sở Công an huyện và đồng thời cũng kết thúc luôn mạng sống của mình. Vợ con những vị quan chức ngành Công an đó đã giày vò con trai và mẹ chồng Cam Giai Ninh vô cùng tàn nhẫn. Trần Tiến - tiến sĩ ngành Hóa ở Mĩ là bạn cũ của Cam Giai Ninh đã lập tức trở về nước, lên kế hoạch hoàn hảo để giúp cô trả thù, bảo vệ con trai cô. Anh ta đã dùng những kiến thức hóa học siêu đẳng của mình để giết hại những kẻ đó một cách ngoạn mục. Trong quá trình cảnh sát phá án, suy đoán anh ta còn có một kẻ đồng phạm bí ẩn. Công an bắt được Trần Tiến là do anh ta cố tình tự để lộ bản thân.\r\n Anh ta có dụng ý gì?\r\n Rốt cuộc kẻ đồng bọn bí ẩn đó là ai?\r\n Liệu Trần Tiến có thể hoàn thành được kế hoạch và mục đích của mình?\r\n\r\nGiới thiệu tác giả:\r\n\r\nTử Kim Trần, nhà văn viết tiểu thuyết trinh thám nổi tiếng. Năm 2012, anh vinh dự đạt hai giải thưởng “10 tác giả xuất sắc nhất trong năm” và “10 tác phẩm xuất sắc nhất” của văn học Thiên Nhai. Văn phong của anh súc tích, ngắn gọn, lạnh lùng và cẩn mật, đặc biệt chú ý đến chi tiết suy luận, dàn dựng nên cốt truyện có tầm vóc, kết thúc luôn khiến độc giả bất ngờ.\"\r\n\r\nMã hàng\t9786043231656\r\nNhà Cung Cấp\tCty Sách Cổ Nguyệt\r\nTác giả\tTử Kim Trần\r\nNgười Dịch\tVũ Thị Hà\r\nNXB\tNXB Văn Học\r\nNăm XB\t2021\r\nTrọng lượng (gr)\t600\r\nKích Thước Bao Bì\t20.5 x 14.5 cm\r\nSố trang\t552\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Truyện Trinh Thám - Kiếm Hiệp bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\n\"Cam Giai Ninh thời sinh viên vốn được mệnh danh là “Nữ hoàng hóa học”, vì trả thù cho chồng nên cô đã thiết kế ra bom nổ giết chết ba người ở Sở Công an huyện và đồng thời cũng kết thúc luôn mạng sống của mình. Vợ con những vị quan chức ngành Công an đó đã giày vò con trai và mẹ chồng Cam Giai Ninh vô cùng tàn nhẫn. Trần Tiến - tiến sĩ ngành Hóa ở Mĩ là bạn cũ của Cam Giai Ninh đã lập tức trở về nước, lên kế hoạch hoàn hảo để giúp cô trả thù, bảo vệ con trai cô. Anh ta đã dùng những kiến thức hóa học siêu đẳng của mình để giết hại những kẻ đó một cách ngoạn mục. Trong quá trình cảnh sát phá án, suy đoán anh ta còn có một kẻ đồng phạm bí ẩn. Công an bắt được Trần Tiến là do anh ta cố tình tự để lộ bản thân.\r\n Anh ta có dụng ý gì?\r\n Rốt cuộc kẻ đồng bọn bí ẩn đó là ai?\r\n Liệu Trần Tiến có thể hoàn thành được kế hoạch và mục đích của mình?\r\n\r\nGiới thiệu tác giả:\r\n\r\nTử Kim Trần, nhà văn viết tiểu thuyết trinh thám nổi tiếng. Năm 2012, anh vinh dự đạt hai giải thưởng “10 tác giả xuất sắc nhất trong năm” và “10 tác phẩm xuất sắc nhất” của văn học Thiên Nhai. Văn phong của anh súc tích, ngắn gọn, lạnh lùng và cẩn mật, đặc biệt chú ý đến chi tiết suy luận, dàn dựng nên cốt truyện có tầm vóc, kết thúc luôn khiến độc giả bất ngờ.\"",
        "public": true,
        "publish_date": "2021",
        "author": "Tử Kim Trần",
        "amount": 123,
        "number_of_page": 552,
        "sold": 11,
        "rating": 5,
        "price": 123250,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/i/m/image_228489.jpg",
        "slug": "su-tra-thu-hoan-hao-tai-ban-2021",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-10T03:47:46.694Z",
        "category": {
            "id": 11,
            "name": "TRINH THÁM ",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 307,
        "name": "Đền Mạng - A Time To Kill",
        "description": "Lấy bối cảnh một thị trấn nhỏ ở miền Nam nước Mỹ những năm 1960, A Time To Kill bắt đầu bằng việc Tonya, một cô bé da đen, mười tuổi đã bị hai thanh niên da trắng cưỡng hiếp và hành hạ một cách dã man. Trong cơn phẫn nộ và mất niềm tin vào pháp luật, Carl Lee Hailey - cha cô bé đã bắn chết hai kẻ bất nhân và làm bị thương nặng một cảnh sát. Anh bị kết tội giết người. Jake Tyler- một luật sư da trắng, đã tìm mọi cách bào chữa cho Carl.\r\nA Time To Kill mang không khí đặc trưng của một tiểu thuyết hình sự: căng thẳng, u ám và có phần nặng nề, nhưng cách tác giả khai thác sâu tâm lý nhân vật cũng mang đến nhiều cảm xúc sâu lắng cho độc giả. Mỗi bước đi của nhân vật đều khiến người xem hồi hộp, lo lắng và chờ đợi những điều sẽ diễn ra tiếp theo.\r\nHấp dẫn và đầy nhân văn, tác phẩm phản ánh một cách chân thực nạn phân biệt chủng tộc và những hệ lụy của nó đối với cuộc sống của những người da đen thời điểm đó. Họ thấp cổ bé họng, họ bị xem thường và pháp luật dường như chỉ thuộc về những người da trắng. Tác phẩm còn mang đến một thông điệp ý nghĩa: cuộc chiến giành công lý chưa bao giờ là một cuộc chiến dễ dàng, đôi khi bạn phải trả giá rất đắt cho điều đó. Nhưng chỉ cần kiên trì và nỗ lực hết sức, một ngày nào đó, những điều tốt đẹp rồi sẽ đến.\r\nTác phẩm A Time To Kill cũng đã được chuyển thể thành bộ phim cùng tên.\r\nJohn Grisham là một nhà văn, luật sư, chính trị gia, và nhà hoạt động người Mỹ nổi tiếng với các tác phẩm hình sự ly kỳ. Sách của ông đã được dịch sang 42 thứ tiếng trên toàn thế giới. A Time To Kill là tác phẩm đầu tay của ông. Tính tới năm 2012, sách của ông đã bán ra hơn 275 triệu bản trên toàn cầu. Grisham cũng là một trong ba nhà văn bán ra hai triệu bản ngay trong lần xuất bản đầu tiên (những người còn lại là Tom Clancy và J.K. Rowling với bộ Harry Potter nổi tiếng). Những tác phẩm bestseller của ông, The Firm, The Guardians, The Last Juror, A Time For Mercy… cũng sắp ra mắt bạn đọc Việt Nam.\r\n\r\nMã hàng\t8934974174769\r\nTên Nhà Cung Cấp\tNXB Trẻ\r\nTác giả\tJohn Grisham\r\nNgười Dịch\tTuấn Việt\r\nNXB\tNXB Trẻ\r\nNăm XB\t2021\r\nTrọng lượng (gr)\t700\r\nKích Thước Bao Bì\t23 x 15.5 cm\r\nSố trang\t672\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Truyện Trinh Thám - Kiếm Hiệp bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nLấy bối cảnh một thị trấn nhỏ ở miền Nam nước Mỹ những năm 1960, A Time To Kill bắt đầu bằng việc Tonya, một cô bé da đen, mười tuổi đã bị hai thanh niên da trắng cưỡng hiếp và hành hạ một cách dã man. Trong cơn phẫn nộ và mất niềm tin vào pháp luật, Carl Lee Hailey - cha cô bé đã bắn chết hai kẻ bất nhân và làm bị thương nặng một cảnh sát. Anh bị kết tội giết người. Jake Tyler- một luật sư da trắng, đã tìm mọi cách bào chữa cho Carl.\r\nA Time To Kill mang không khí đặc trưng của một tiểu thuyết hình sự: căng thẳng, u ám và có phần nặng nề, nhưng cách tác giả khai thác sâu tâm lý nhân vật cũng mang đến nhiều cảm xúc sâu lắng cho độc giả. Mỗi bước đi của nhân vật đều khiến người xem hồi hộp, lo lắng và chờ đợi những điều sẽ diễn ra tiếp theo.\r\nHấp dẫn và đầy nhân văn, tác phẩm phản ánh một cách chân thực nạn phân biệt chủng tộc và những hệ lụy của nó đối với cuộc sống của những người da đen thời điểm đó. Họ thấp cổ bé họng, họ bị xem thường và pháp luật dường như chỉ thuộc về những người da trắng. Tác phẩm còn mang đến một thông điệp ý nghĩa: cuộc chiến giành công lý chưa bao giờ là một cuộc chiến dễ dàng, đôi khi bạn phải trả giá rất đắt cho điều đó. Nhưng chỉ cần kiên trì và nỗ lực hết sức, một ngày nào đó, những điều tốt đẹp rồi sẽ đến.\r\nTác phẩm A Time To Kill cũng đã được chuyển thể thành bộ phim cùng tên.\r\nJohn Grisham là một nhà văn, luật sư, chính trị gia, và nhà hoạt động người Mỹ nổi tiếng với các tác phẩm hình sự ly kỳ. Sách của ông đã được dịch sang 42 thứ tiếng trên toàn thế giới. A Time To Kill là tác phẩm đầu tay của ông. Tính tới năm 2012, sách của ông đã bán ra hơn 275 triệu bản trên toàn cầu. Grisham cũng là một trong ba nhà văn bán ra hai triệu bản ngay trong lần xuất bản đầu tiên (những người còn lại là Tom Clancy và J.K. Rowling với bộ Harry Potter nổi tiếng). Những tác phẩm bestseller của ông, The Firm, The Guardians, The Last Juror, A Time For Mercy… cũng sắp ra mắt bạn đọc Việt Nam.",
        "public": true,
        "publish_date": "2020",
        "author": "John Grisham",
        "amount": 670,
        "number_of_page": 672,
        "sold": 1,
        "rating": 5,
        "price": 216750,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/i/m/image_244718_1_3608.jpg",
        "slug": "den-mang-a-time-to-kill",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 11,
            "name": "TRINH THÁM ",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 308,
        "name": "Án Tình - 25 Truyện Có Thật",
        "description": "Án Tình - 25 Truyện Có Thật\r\n\r\nYêu thương với tất cả mê đắm cho đến khi tình yêu đó bắt đầu mang sắc thái, dáng dấp khác thường ẩn chứa nỗi cuồng si, điên loạn: những kẻ đang yêu nhau sẵn sàng giết nhau.\r\n\r\nQua những tư liệu, chứng cứ pháp lý cụ thể của “25 truyện có thật - Án tình” đã xảy ra trong khoảng thời gian, không gian nào đó, tác giả đã sách Án tình 25 truyện có thật kể lại một vụ giết người hay có toan tính1 cố sát mà động cơ khiến kẻ sát [...]",
        "public": true,
        "publish_date": "2017",
        "author": "Jean , Fracncois Nahmias",
        "amount": 207,
        "number_of_page": 327,
        "sold": 233,
        "rating": 5,
        "price": 97000,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/i/m/image_134505.jpg",
        "slug": "an-tinh-25-truyen-co-that",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-10T03:47:46.693Z",
        "category": {
            "id": 11,
            "name": "TRINH THÁM ",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 309,
        "name": "Thiết Kế Giải Pháp Giá Trị - Value Proposition Design",
        "description": "Thiết Kế Giải Pháp Giá Trị - Value Proposition Design\r\n\r\nCuốn sách này sẽ giúp bạn đọc hiểu rõ hơn về cách tạo ra những sản phẩm và dịch vụ mà khách hàng mong muốn. Ngay cả khi bạn chưa đọc về cách tạo lập một mô hình kinh doanh mới, bạn cũng vẫn có thể đọc hiểu cuốn sách này và tìm ra câu trả lời cho câu hỏi luôn là nỗi trăn trở thường trực của bất kỳ doanh nghiệp nào: Làm thế nào để tạo ra những sản phẩm và dịch vụ mà khách hàng muốn?\r\n\r\nQuyển sách tập trung vào 2 yếu tố quan trọng của khung mô hình kinh doanh, là phân khúc khách hàng và giải pháp giá trị. Bí quyết để tạo ra được những sản phẩm và dịch vụ mà khách hàng mong muốn chính là tìm ra sự phù hợp giữa hồ sơ khách hàng (mong muốn của khách hàng) và giải pháp giá trị (sản phẩm và dịch vụ) của bạn, thông qua trả lời các câu hỏi:\r\n\r\nSản phẩm và dịch vụ của bạn có đáp ứng được những việc cần làm của khách hàng không?\r\n\r\nSản phẩm và dịch vụ của bạn có giúp giải quyết những vấn đề rắc rối, khó nhằn của khách hàng không?\r\n\r\nVà sau cùng, sản phẩm và dịch vụ của bạn có tạo ra một lợi ích nào đó cho khách hàng không?\r\n\r\nVới quy trình chuẩn cùng những hướng dẫn vô cùng chi tiết và dễ hiểu, quyển sách sẽ giúp bạn thiết kế được giải pháp giá trị đúng cho doanh nghiệp của bạn, không chỉ hữu ích cho chủ doanh nghiệp hiện hữu, mà cả cho những người đang khởi sự kinh doanh.\r\n\r\nMã hàng\t8935251418569\r\nTên Nhà Cung Cấp\tAlpha Books\r\nTác giả\tNhiều Tác Giả\r\nNgười Dịch\tAlphabooks\r\nNXB\tCông Thương\r\nNăm XB\t2022\r\nTrọng lượng (gr)\t500\r\nKích Thước Bao Bì\t24 x 19 x 1.8 cm\r\nSố trang\t312\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Nhân vật - Bài Học Kinh doanh bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nThiết Kế Giải Pháp Giá Trị - Value Proposition Design\r\n\r\nCuốn sách này sẽ giúp bạn đọc hiểu rõ hơn về cách tạo ra những sản phẩm và dịch vụ mà khách hàng mong muốn. Ngay cả khi bạn chưa đọc về cách tạo lập một mô hình kinh doanh mới, bạn cũng vẫn có thể đọc hiểu cuốn sách này và tìm ra câu trả lời cho câu hỏi luôn là nỗi trăn trở thường trực của bất kỳ doanh nghiệp nào: Làm thế nào để tạo ra những sản phẩm và dịch vụ mà khách hàng muốn?\r\n\r\nQuyển sách tập trung vào 2 yếu tố quan trọng của khung mô hình kinh doanh, là phân khúc khách hàng và giải pháp giá trị. Bí quyết để tạo ra được những sản phẩm và dịch vụ mà khách hàng mong muốn chính là tìm ra sự phù hợp giữa hồ sơ khách hàng (mong muốn của khách hàng) và giải pháp giá trị (sản phẩm và dịch vụ) của bạn, thông qua trả lời các câu hỏi:\r\n\r\nSản phẩm và dịch vụ của bạn có đáp ứng được những việc cần làm của khách hàng không?\r\n\r\nSản phẩm và dịch vụ của bạn có giúp giải quyết những vấn đề rắc rối, khó nhằn của khách hàng không?\r\n\r\nVà sau cùng, sản phẩm và dịch vụ của bạn có tạo ra một lợi ích nào đó cho khách hàng không?\r\n\r\nVới quy trình chuẩn cùng những hướng dẫn vô cùng chi tiết và dễ hiểu, quyển sách sẽ giúp bạn thiết kế được giải pháp giá trị đúng cho doanh nghiệp của bạn, không chỉ hữu ích cho chủ doanh nghiệp hiện hữu, mà cả cho những người đang khởi sự kinh doanh.",
        "public": true,
        "publish_date": "2021",
        "author": "Nhiều Tác Giả",
        "amount": 300,
        "number_of_page": 312,
        "sold": 1,
        "rating": 5,
        "price": 237300,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/flashmagazine/images/page_images/thiet_ke_giai_phap_gia_tri___value_proposition_design/2023_03_21_16_22_26_1-390x510.jpg",
        "slug": "thiet-ke-giai-phap-gia-tri-value-proposition-design",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 13,
            "name": "KINH TẾ - KINH DOANH",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 310,
        "name": "Bán Hàng Shopee Thực Chiến Từ A-Z - 36 Chiến Lược Đỉnh Cao Bùng Nổ Doanh Số (Tái Bản)",
        "description": "Đáp ứng nhu cầu ngày càng tăng trong việc tìm hiểu về cổ phần, cổ phiếu, chứng khoán, chiến lược đầu tư của độc giả, Alpha Books chọn mua bản quyền dịch và xuất bản bộ sách về đầu tư chứng khoán bao gồm: Giàu từ chứng khoán; Trở thành thiên tài chứng khoán; Cổ phiếu thường - lợi nhuận phi thường; Hồi ức của một thiên tài chứng khoán; Phố Wall - Một Las Vegas khác; Quy tắc số 1: đầu tư thành công chỉ với 15 phút mỗi tuần; Trên đỉnh Phố Wall…\r\n\r\nCuốn sách Chết vì chứng khoán: Jess Livermore - Câu chuyện về nhà đầu tư chứng khoán vĩ đại nhất mà các bạn đang cầm trong tay nằm trong loạt sách này, là về cuộc đời của Jesse Livermore, một trong những nhà kinh doanh chứng khoán thành công nhất thế giới, nhưng chính ông cũng phải đón nhận một kết cục hết sức bi thảm: gia đình tan vỡ, tài chính phá sản và tự sát trong tuyệt vọng. Cuốn sách sẽ đem lại rất nhiều bài học bổ ích, những kinh nghiệm chắt lọc từ thăng trầm trong cuộc đời ông hẳn sẽ có giá trị và hữu ích đối với độc giả và các nhà đầu tư chứng khoán của Việt Nam hôm nay.\r\n\r\nĐược tuyển chọn từ những bộ sách về đầu tư, tài chính và chứng khoán nổi tiếng nhất của nhiều tác giả tên tuổi hàng đầu thế giới, hy vọng các cuốn sách này sẽ trở thành một món quà giá trị và hữu ích cho tất cả các độc giả quan tâm.\r\n\r\nĐánh giá\r\n\r\n“Một cuốn sách tuyệt vời! Nắm bắt cả bộ óc và cuộc đời của Jesse Livermore, nhà đầu tư huyền thoại, cuốn sách này đề cập đến hai vụ sụp đổ lớn của thị trường chứng khoán thế giới, những câu chuyện tình ái và vụ tự sát của Jesse Jr. và hai vụ tự sát gia đình… Một cuốn sách vô cùng hấp dẫn.” - Ace Greenberg, Chủ tịch tập đoàn Bear Stearns\r\n\r\n“Thực sự xuất sắc. Tôi bắt đầu đọc cuốn sách này khi đang từ sân bay Kimbo ở Seoul đến Đức. Khi chúng tôi tới Novosibirsk, Nga…tôi đã đọc xong. Tôi chỉ không bỏ nó xuống được! Cuốn sách không chỉ là một bài học tuyệt vời về đầu tư và kinh doanh mà nó còn là một nghiên cứu tâm lý hấp dẫn về điều gì đã tạo nên một nhà đầu tư vĩ đại.\r\n\r\n\"Sự thăng trầm của một nhà đầu cơ vĩ đại và gia đình ông là một câu chuyện ly kỳ. Thực tế rằng cuốn sách được xây dựng dựa trên các cuộc phỏng vấn với những người sống sót trong gia đình Livermore và những người đã chứng kiến các sự kiện trong cuộc đời Jesse Livermore làm cho nó trở nên cực kỳ hấp dẫn. Thật là một tác phẩm tuyệt vời.”\r\n\r\n- Mark Mobius, Giám độc điều hành của tập đoàn Templeton Asset Management.\r\n\r\nVề tác giả:\r\n\r\nRICHARD SMITTEN là một tác giả chuyên nghiệp và là một nhà đầu tư sinh sống ở Ft. Lauderdale, Florida. Ông tốt nghiệp ngành tiếng Anh, Đại học Western Ontario. Trong vai trò Phó Chủ tịch của MTS International, ông quản lý nhân sự tại giếng dầu North Sea và quản lý những giếng dầu ở Nigeria mới được khám phá sau đó. Ông cũng đã từng làm việc cho Công ty Vick Chemical trong vai trò Giám đốc Marketing của khu vực Canada. Smitten là tác giả của rất nhiều cuốn sách trong đó có The Godmother, Capital Crimes và Legal Tender, đồng tác giả (với Robin Moore) viết cuốn Inside the Cocaine Cartel.\r\n\r\nMã hàng\t8935251417029\r\nTên Nhà Cung Cấp\tAlpha Books\r\nTác giả\tRichard Smitten\r\nNgười Dịch\tAlphabooks\r\nNXB\tNXB Lao Động\r\nNăm XB\t2021\r\nTrọng lượng (gr)\t300\r\nKích Thước Bao Bì\t20.5 x 13 cm\r\nSố trang\t480\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Nhân vật - Bài Học Kinh doanh bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nĐáp ứng nhu cầu ngày càng tăng trong việc tìm hiểu về cổ phần, cổ phiếu, chứng khoán, chiến lược đầu tư của độc giả, Alpha Books chọn mua bản quyền dịch và xuất bản bộ sách về đầu tư chứng khoán bao gồm: Giàu từ chứng khoán; Trở thành thiên tài chứng khoán; Cổ phiếu thường - lợi nhuận phi thường; Hồi ức của một thiên tài chứng khoán; Phố Wall - Một Las Vegas khác; Quy tắc số 1: đầu tư thành công chỉ với 15 phút mỗi tuần; Trên đỉnh Phố Wall…\r\n\r\nCuốn sách Chết vì chứng khoán: Jess Livermore - Câu chuyện về nhà đầu tư chứng khoán vĩ đại nhất mà các bạn đang cầm trong tay nằm trong loạt sách này, là về cuộc đời của Jesse Livermore, một trong những nhà kinh doanh chứng khoán thành công nhất thế giới, nhưng chính ông cũng phải đón nhận một kết cục hết sức bi thảm: gia đình tan vỡ, tài chính phá sản và tự sát trong tuyệt vọng. Cuốn sách sẽ đem lại rất nhiều bài học bổ ích, những kinh nghiệm chắt lọc từ thăng trầm trong cuộc đời ông hẳn sẽ có giá trị và hữu ích đối với độc giả và các nhà đầu tư chứng khoán của Việt Nam hôm nay.\r\n\r\nĐược tuyển chọn từ những bộ sách về đầu tư, tài chính và chứng khoán nổi tiếng nhất của nhiều tác giả tên tuổi hàng đầu thế giới, hy vọng các cuốn sách này sẽ trở thành một món quà giá trị và hữu ích cho tất cả các độc giả quan tâm.\r\n\r\nĐánh giá\r\n\r\n“Một cuốn sách tuyệt vời! Nắm bắt cả bộ óc và cuộc đời của Jesse Livermore, nhà đầu tư huyền thoại, cuốn sách này đề cập đến hai vụ sụp đổ lớn của thị trường chứng khoán thế giới, những câu chuyện tình ái và vụ tự sát của Jesse Jr. và hai vụ tự sát gia đình… Một cuốn sách vô cùng hấp dẫn.” - Ace Greenberg, Chủ tịch tập đoàn Bear Stearns\r\n\r\n“Thực sự xuất sắc. Tôi bắt đầu đọc cuốn sách này khi đang từ sân bay Kimbo ở Seoul đến Đức. Khi chúng tôi tới Novosibirsk, Nga…tôi đã đọc xong. Tôi chỉ không bỏ nó xuống được! Cuốn sách không chỉ là một bài học tuyệt vời về đầu tư và kinh doanh mà nó còn là một nghiên cứu tâm lý hấp dẫn về điều gì đã tạo nên một nhà đầu tư vĩ đại.\r\n\r\n\"Sự thăng trầm của một nhà đầu cơ vĩ đại và gia đình ông là một câu chuyện ly kỳ. Thực tế rằng cuốn sách được xây dựng dựa trên các cuộc phỏng vấn với những người sống sót trong gia đình Livermore và những người đã chứng kiến các sự kiện trong cuộc đời Jesse Livermore làm cho nó trở nên cực kỳ hấp dẫn. Thật là một tác phẩm tuyệt vời.”\r\n\r\n- Mark Mobius, Giám độc điều hành của tập đoàn Templeton Asset Management.\r\n\r\nVề tác giả:\r\n\r\nRICHARD SMITTEN là một tác giả chuyên nghiệp và là một nhà đầu tư sinh sống ở Ft. Lauderdale, Florida. Ông tốt nghiệp ngành tiếng Anh, Đại học Western Ontario. Trong vai trò Phó Chủ tịch của MTS International, ông quản lý nhân sự tại giếng dầu North Sea và quản lý những giếng dầu ở Nigeria mới được khám phá sau đó. Ông cũng đã từng làm việc cho Công ty Vick Chemical trong vai trò Giám đốc Marketing của khu vực Canada. Smitten là tác giả của rất nhiều cuốn sách trong đó có The Godmother, Capital Crimes và Legal Tender, đồng tác giả (với Robin Moore) viết cuốn Inside the Cocaine Cartel.",
        "public": true,
        "publish_date": "2021",
        "author": "Văn Chính",
        "amount": 240,
        "number_of_page": 245,
        "sold": 5345,
        "rating": 5,
        "price": 211650,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/9/7/9786043588644_1.jpg",
        "slug": "ban-hang-shopee-thuc-chien-tu-a-z-36-chien-luoc-dinh-cao-bung-no-doanh-so-tai-ban",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-10T03:47:46.698Z",
        "category": {
            "id": 13,
            "name": "KINH TẾ - KINH DOANH",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 311,
        "name": "Chết Vì Chứng Khoán",
        "description": "Đáp ứng nhu cầu ngày càng tăng trong việc tìm hiểu về cổ phần, cổ phiếu, chứng khoán, chiến lược đầu tư của độc giả, Alpha Books chọn mua bản quyền dịch và xuất bản bộ sách về đầu tư chứng khoán bao gồm: Giàu từ chứng khoán; Trở thành thiên tài chứng khoán; Cổ phiếu thường - lợi nhuận phi thường; Hồi ức của một thiên tài chứng khoán; Phố Wall - Một Las Vegas khác; Quy tắc số 1: đầu tư thành công chỉ với 15 phút mỗi tuần; Trên đỉnh Phố Wall…\r\n\r\nCuốn sách Chết vì chứng khoán: Jess Livermore - Câu chuyện về nhà đầu tư chứng khoán vĩ đại nhất mà các bạn đang cầm trong tay nằm trong loạt sách này, là về cuộc đời của Jesse Livermore, một trong những nhà kinh doanh chứng khoán thành công nhất thế giới, nhưng chính ông cũng phải đón nhận một kết cục hết sức bi thảm: gia đình tan vỡ, tài chính phá sản và tự sát trong tuyệt vọng. Cuốn sách sẽ đem lại rất nhiều bài học bổ ích, những kinh nghiệm chắt lọc từ thăng trầm trong cuộc đời ông hẳn sẽ có giá trị và hữu ích đối với độc giả và các nhà đầu tư chứng khoán của Việt Nam hôm nay.\r\n\r\nĐược tuyển chọn từ những bộ sách về đầu tư, tài chính và chứng khoán nổi tiếng nhất của nhiều tác giả tên tuổi hàng đầu thế giới, hy vọng các cuốn sách này sẽ trở thành một món quà giá trị và hữu ích cho tất cả các độc giả quan tâm.\r\n\r\nĐánh giá\r\n\r\n“Một cuốn sách tuyệt vời! Nắm bắt cả bộ óc và cuộc đời của Jesse Livermore, nhà đầu tư huyền thoại, cuốn sách này đề cập đến hai vụ sụp đổ lớn của thị trường chứng khoán thế giới, những câu chuyện tình ái và vụ tự sát của Jesse Jr. và hai vụ tự sát gia đình… Một cuốn sách vô cùng hấp dẫn.” - Ace Greenberg, Chủ tịch tập đoàn Bear Stearns\r\n\r\n“Thực sự xuất sắc. Tôi bắt đầu đọc cuốn sách này khi đang từ sân bay Kimbo ở Seoul đến Đức. Khi chúng tôi tới Novosibirsk, Nga…tôi đã đọc xong. Tôi chỉ không bỏ nó xuống được! Cuốn sách không chỉ là một bài học tuyệt vời về đầu tư và kinh doanh mà nó còn là một nghiên cứu tâm lý hấp dẫn về điều gì đã tạo nên một nhà đầu tư vĩ đại.\r\n\r\n\"Sự thăng trầm của một nhà đầu cơ vĩ đại và gia đình ông là một câu chuyện ly kỳ. Thực tế rằng cuốn sách được xây dựng dựa trên các cuộc phỏng vấn với những người sống sót trong gia đình Livermore và những người đã chứng kiến các sự kiện trong cuộc đời Jesse Livermore làm cho nó trở nên cực kỳ hấp dẫn. Thật là một tác phẩm tuyệt vời.”\r\n\r\n- Mark Mobius, Giám độc điều hành của tập đoàn Templeton Asset Management.\r\n\r\nVề tác giả:\r\n\r\nRICHARD SMITTEN là một tác giả chuyên nghiệp và là một nhà đầu tư sinh sống ở Ft. Lauderdale, Florida. Ông tốt nghiệp ngành tiếng Anh, Đại học Western Ontario. Trong vai trò Phó Chủ tịch của MTS International, ông quản lý nhân sự tại giếng dầu North Sea và quản lý những giếng dầu ở Nigeria mới được khám phá sau đó. Ông cũng đã từng làm việc cho Công ty Vick Chemical trong vai trò Giám đốc Marketing của khu vực Canada. Smitten là tác giả của rất nhiều cuốn sách trong đó có The Godmother, Capital Crimes và Legal Tender, đồng tác giả (với Robin Moore) viết cuốn Inside the Cocaine Cartel.\r\n\r\nMã hàng\t8935251417029\r\nTên Nhà Cung Cấp\tAlpha Books\r\nTác giả\tRichard Smitten\r\nNgười Dịch\tAlphabooks\r\nNXB\tNXB Lao Động\r\nNăm XB\t2021\r\nTrọng lượng (gr)\t300\r\nKích Thước Bao Bì\t20.5 x 13 cm\r\nSố trang\t480\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Nhân vật - Bài Học Kinh doanh bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nĐáp ứng nhu cầu ngày càng tăng trong việc tìm hiểu về cổ phần, cổ phiếu, chứng khoán, chiến lược đầu tư của độc giả, Alpha Books chọn mua bản quyền dịch và xuất bản bộ sách về đầu tư chứng khoán bao gồm: Giàu từ chứng khoán; Trở thành thiên tài chứng khoán; Cổ phiếu thường - lợi nhuận phi thường; Hồi ức của một thiên tài chứng khoán; Phố Wall - Một Las Vegas khác; Quy tắc số 1: đầu tư thành công chỉ với 15 phút mỗi tuần; Trên đỉnh Phố Wall…\r\n\r\nCuốn sách Chết vì chứng khoán: Jess Livermore - Câu chuyện về nhà đầu tư chứng khoán vĩ đại nhất mà các bạn đang cầm trong tay nằm trong loạt sách này, là về cuộc đời của Jesse Livermore, một trong những nhà kinh doanh chứng khoán thành công nhất thế giới, nhưng chính ông cũng phải đón nhận một kết cục hết sức bi thảm: gia đình tan vỡ, tài chính phá sản và tự sát trong tuyệt vọng. Cuốn sách sẽ đem lại rất nhiều bài học bổ ích, những kinh nghiệm chắt lọc từ thăng trầm trong cuộc đời ông hẳn sẽ có giá trị và hữu ích đối với độc giả và các nhà đầu tư chứng khoán của Việt Nam hôm nay.\r\n\r\nĐược tuyển chọn từ những bộ sách về đầu tư, tài chính và chứng khoán nổi tiếng nhất của nhiều tác giả tên tuổi hàng đầu thế giới, hy vọng các cuốn sách này sẽ trở thành một món quà giá trị và hữu ích cho tất cả các độc giả quan tâm.\r\n\r\nĐánh giá\r\n\r\n“Một cuốn sách tuyệt vời! Nắm bắt cả bộ óc và cuộc đời của Jesse Livermore, nhà đầu tư huyền thoại, cuốn sách này đề cập đến hai vụ sụp đổ lớn của thị trường chứng khoán thế giới, những câu chuyện tình ái và vụ tự sát của Jesse Jr. và hai vụ tự sát gia đình… Một cuốn sách vô cùng hấp dẫn.” - Ace Greenberg, Chủ tịch tập đoàn Bear Stearns\r\n\r\n“Thực sự xuất sắc. Tôi bắt đầu đọc cuốn sách này khi đang từ sân bay Kimbo ở Seoul đến Đức. Khi chúng tôi tới Novosibirsk, Nga…tôi đã đọc xong. Tôi chỉ không bỏ nó xuống được! Cuốn sách không chỉ là một bài học tuyệt vời về đầu tư và kinh doanh mà nó còn là một nghiên cứu tâm lý hấp dẫn về điều gì đã tạo nên một nhà đầu tư vĩ đại.\r\n\r\n\"Sự thăng trầm của một nhà đầu cơ vĩ đại và gia đình ông là một câu chuyện ly kỳ. Thực tế rằng cuốn sách được xây dựng dựa trên các cuộc phỏng vấn với những người sống sót trong gia đình Livermore và những người đã chứng kiến các sự kiện trong cuộc đời Jesse Livermore làm cho nó trở nên cực kỳ hấp dẫn. Thật là một tác phẩm tuyệt vời.”\r\n\r\n- Mark Mobius, Giám độc điều hành của tập đoàn Templeton Asset Management.\r\n\r\nVề tác giả:\r\n\r\nRICHARD SMITTEN là một tác giả chuyên nghiệp và là một nhà đầu tư sinh sống ở Ft. Lauderdale, Florida. Ông tốt nghiệp ngành tiếng Anh, Đại học Western Ontario. Trong vai trò Phó Chủ tịch của MTS International, ông quản lý nhân sự tại giếng dầu North Sea và quản lý những giếng dầu ở Nigeria mới được khám phá sau đó. Ông cũng đã từng làm việc cho Công ty Vick Chemical trong vai trò Giám đốc Marketing của khu vực Canada. Smitten là tác giả của rất nhiều cuốn sách trong đó có The Godmother, Capital Crimes và Legal Tender, đồng tác giả (với Robin Moore) viết cuốn Inside the Cocaine Cartel.",
        "public": true,
        "publish_date": "2020",
        "author": "Richard Smitten",
        "amount": 480,
        "number_of_page": 480,
        "sold": 1,
        "rating": 5,
        "price": 139300,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/flashmagazine/images/page_images/chet_vi_chung_khoan/2021_06_23_08_22_10_1-390x510.jpg",
        "slug": "chet-vi-chung-khoan",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 13,
            "name": "KINH TẾ - KINH DOANH",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 312,
        "name": "Henry Ford - Tôi Và Ford Motor: Cách Tỉ Phú Henry Ford Điều Hành Ford Motor Từ Thuở Sơ Khai Đến Tầm Thế Giới (Tái Bản 2023)",
        "description": "Henry Ford – Tôi Và Ford Motor: Cách Tỉ Phú Henry Ford Điều Hành Ford Motor Từ Thuở Sơ Khai Đến Tầm Thế Giới\r\n\r\nHENRY FORD, nhà sáng lập Công ty Ford Motor, là một trong những tỉ phú đầu tiên của nước Mĩ. Ford chính là người đã đưa vào ứng dụng các dây chuyền sản xuất trong nhà máy của mình, đưa cả thế giới vào thời đại sản xuất hàng loạt. Nhờ phương pháp bố trí thông minh, cùng chiến lược bán hàng tập trung vào số lượng, Ford đã đặt cả nhân loại lên trên những chiếc xe bốn bánh, thay đổi hoàn toàn cách di chuyển của Thế kỉ XX.\r\n\r\nVừa giúp mọi người có thể mua sản phẩm vốn được xem là xa xỉ, vừa giúp nhân công có lương cao, vừa mang về lợi nhuận lớn cho chính mình và cổ đông, Henry Ford đã thay đổi hoàn toàn cách vận hành doanh nghiệp hiện đại. Để hiểu rõ bí mật đằng sau thành công kì lạ của Ford, không có khởi đầu nào thích hợp hơn quyển sách được viết bởi chính ông: HENRY FORD: Tôi và Ford Motor.\r\n\r\nPhiên bản sách chuẩn kinh doanh - với sự phối hợp biên dịch của Ecoblader và NXB Kinh Tế TPHCM - sẽ mang lại cho độc giả những tư tưởng nghệ thuật kinh doanh kinh điển của một trong những tượng đài khai sinh nên nền kinh tế thế giới nói chung và nước Mỹ nói riêng - Henry Ford.\r\n\r\nMã hàng\t9786043461640\r\nTên Nhà Cung Cấp\tCông ty TNHH Ecoblader\r\nTác giả\tHenry Ford, Samuel Crowther\r\nNgười Dịch\tNguyễn Hạo Nhiên\r\nNXB\tKinh tế TP.Hồ Chí Minh\r\nNăm XB\t2023\r\nNgôn Ngữ\tTiếng Việt\r\nTrọng lượng (gr)\t250\r\nKích Thước Bao Bì\t20.5 x 14.5 x 1 cm\r\nSố trang\t232\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Nhân vật - Bài Học Kinh doanh bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nHenry Ford – Tôi Và Ford Motor: Cách Tỉ Phú Henry Ford Điều Hành Ford Motor Từ Thuở Sơ Khai Đến Tầm Thế Giới\r\n\r\nHENRY FORD, nhà sáng lập Công ty Ford Motor, là một trong những tỉ phú đầu tiên của nước Mĩ. Ford chính là người đã đưa vào ứng dụng các dây chuyền sản xuất trong nhà máy của mình, đưa cả thế giới vào thời đại sản xuất hàng loạt. Nhờ phương pháp bố trí thông minh, cùng chiến lược bán hàng tập trung vào số lượng, Ford đã đặt cả nhân loại lên trên những chiếc xe bốn bánh, thay đổi hoàn toàn cách di chuyển của Thế kỉ XX.\r\n\r\nVừa giúp mọi người có thể mua sản phẩm vốn được xem là xa xỉ, vừa giúp nhân công có lương cao, vừa mang về lợi nhuận lớn cho chính mình và cổ đông, Henry Ford đã thay đổi hoàn toàn cách vận hành doanh nghiệp hiện đại. Để hiểu rõ bí mật đằng sau thành công kì lạ của Ford, không có khởi đầu nào thích hợp hơn quyển sách được viết bởi chính ông: HENRY FORD: Tôi và Ford Motor.\r\n\r\nPhiên bản sách chuẩn kinh doanh - với sự phối hợp biên dịch của Ecoblader và NXB Kinh Tế TPHCM - sẽ mang lại cho độc giả những tư tưởng nghệ thuật kinh doanh kinh điển của một trong những tượng đài khai sinh nên nền kinh tế thế giới nói chung và nước Mỹ nói riêng - Henry Ford.",
        "public": true,
        "publish_date": "2022",
        "author": "Henry Ford, Samuel Crowther",
        "amount": 230,
        "number_of_page": 232,
        "sold": 1,
        "rating": 5,
        "price": 135000,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/9/7/9786043461640.jpg",
        "slug": "henry-ford-toi-va-ford-motor-cach-ti-phu-henry-ford-dieu-hanh-ford-motor-tu-thuo-so-khai-den-tam-the-gioi-tai-ban-2023",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 13,
            "name": "KINH TẾ - KINH DOANH",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 313,
        "name": "Elon Musk Và Cuộc Cách Mạng Tài Chính Toàn Cầu",
        "description": "Elon Musk Và Cuộc Cách Mạng Tài Chính Toàn Cầu\r\n\r\nNgày nay, Elon Musk, Peter Thiel, Max Levchin… được coi là những nhà tiên phong của ngành công nghệ. Tuy nhiên, câu chuyện về nơi họ bắt đầu hầu như không được kể đến. Trước khi thành lập, tài trợ và tư vấn cho các công ty hàng đầu thế giới, bao gồm Tesla, Facebook, YouTube, SpaceX, và LinkedIn, họ là những nhà sáng tạo vô danh của một công ty khởi nghiệp thanh toán trực tuyến nhỏ bé có tên là PayPal.\r\n\r\nCuốn sách này sẽ khám phá những ngày đầu đầy sóng gió ấy, tìm hiểu câu chuyện về về một nhóm thanh niên tài năng, nhiệt huyết đã tập hợp cùng nhau trong những ngày đầu của internet như thế nào, và thành tựu của họ đã định hình thế giới ngày nay—các công ty khởi nghiệp kỹ thuật số, tài chính không dùng tiền mặt, chuyển tiền điện tử và thay đổi thế giới của chúng ta mãi mãi ra sao.\r\n\r\nBạn đọc sẽ được chứng kiến hành trình về câu chuyện của công ty PayPal, từ những lần thất bại cho đến sự thành công như ngày nay. Đây là cuốn sách về một ví dụ của thành công, nhưng không tạo gánh nặng cho người đọc bằng những “bài học”. Có một thông điệp quan trọng vượt ngoài cả những bài học về tiền bạc, kinh doanh và cạnh tranh trên thương trường trong cuốn sách. Đó là: Cuộc sống của chúng ta sẽ được định hình bởi những thứ ta tạo ra và những người đồng hành sáng tạo cùng ta. Câu chuyện của PayPal không chỉ là về việc mọi người kết hợp với nhau để tạo nên một sản phẩm – mà còn về cách nhóm cùng nhau định hình chính con người của họ. Những người sáng lập và nhân viên đầu tiên của công ty đã thúc đẩy và yêu cầu nhau phát triển hơn mỗi ngày; để viết nên một dạng câu chuyện cổ tích trong Thung lũng Silicon – Thung lũng điện tử.\r\n\r\nVề tác giả:\r\n\r\nJimmy Soni là một tác giả từng đoạt nhiều giải thưởng. Cuốn sách Elon Musk và cuộc cách mạng tài chính toàn cầu là cuốn sách bán chạy nhất toàn nước Mỹ và nhận được nhiều lời khen ngợi từ The New York Times, Wall Street Journal, New Yorker, The Economist, Financial Times,…\r\n\r\nMã hàng\t8936066696753\r\nDự Kiến Có Hàng\t12/08/2023\r\nTên Nhà Cung Cấp\t1980 Books\r\nTác giả\tJimmy Soni\r\nNgười Dịch\tThảo Nguyên\r\nNXB\tCông Thương\r\nNăm XB\t2023\r\nNgôn Ngữ\tTiếng Việt\r\nTrọng lượng (gr)\t500\r\nKích Thước Bao Bì\t24 x 16 x 2.4 cm\r\nSố trang\t488\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Nhân vật - Bài Học Kinh doanh bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nElon Musk Và Cuộc Cách Mạng Tài Chính Toàn Cầu\r\n\r\nNgày nay, Elon Musk, Peter Thiel, Max Levchin… được coi là những nhà tiên phong của ngành công nghệ. Tuy nhiên, câu chuyện về nơi họ bắt đầu hầu như không được kể đến. Trước khi thành lập, tài trợ và tư vấn cho các công ty hàng đầu thế giới, bao gồm Tesla, Facebook, YouTube, SpaceX, và LinkedIn, họ là những nhà sáng tạo vô danh của một công ty khởi nghiệp thanh toán trực tuyến nhỏ bé có tên là PayPal.\r\n\r\nCuốn sách này sẽ khám phá những ngày đầu đầy sóng gió ấy, tìm hiểu câu chuyện về về một nhóm thanh niên tài năng, nhiệt huyết đã tập hợp cùng nhau trong những ngày đầu của internet như thế nào, và thành tựu của họ đã định hình thế giới ngày nay—các công ty khởi nghiệp kỹ thuật số, tài chính không dùng tiền mặt, chuyển tiền điện tử và thay đổi thế giới của chúng ta mãi mãi ra sao.\r\n\r\nBạn đọc sẽ được chứng kiến hành trình về câu chuyện của công ty PayPal, từ những lần thất bại cho đến sự thành công như ngày nay. Đây là cuốn sách về một ví dụ của thành công, nhưng không tạo gánh nặng cho người đọc bằng những “bài học”. Có một thông điệp quan trọng vượt ngoài cả những bài học về tiền bạc, kinh doanh và cạnh tranh trên thương trường trong cuốn sách. Đó là: Cuộc sống của chúng ta sẽ được định hình bởi những thứ ta tạo ra và những người đồng hành sáng tạo cùng ta. Câu chuyện của PayPal không chỉ là về việc mọi người kết hợp với nhau để tạo nên một sản phẩm – mà còn về cách nhóm cùng nhau định hình chính con người của họ. Những người sáng lập và nhân viên đầu tiên của công ty đã thúc đẩy và yêu cầu nhau phát triển hơn mỗi ngày; để viết nên một dạng câu chuyện cổ tích trong Thung lũng Silicon – Thung lũng điện tử.\r\n\r\nVề tác giả:\r\n\r\nJimmy Soni là một tác giả từng đoạt nhiều giải thưởng. Cuốn sách Elon Musk và cuộc cách mạng tài chính toàn cầu là cuốn sách bán chạy nhất toàn nước Mỹ và nhận được nhiều lời khen ngợi từ The New York Times, Wall Street Journal, New Yorker, The Economist, Financial Times,…\r\n\r\nĐánh",
        "public": true,
        "publish_date": "2022",
        "author": "Jimmy Soni",
        "amount": 500,
        "number_of_page": 488,
        "sold": 345,
        "rating": 5,
        "price": 224000,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/8/9/8936066696753.jpg",
        "slug": "elon-musk-va-cuoc-cach-mang-tai-chinh-toan-cau",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-10T03:47:46.687Z",
        "category": {
            "id": 13,
            "name": "KINH TẾ - KINH DOANH",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 314,
        "name": "Dưới Tảng Băng Của Sự Thành Công - Câu Chuyện Khởi Nghiệp Nữ Doanh Nhân",
        "description": "Thành công, khi bạn thực sự hạnh phúc với chính con người bạn trở thành - Thành công theo cách của bạn.\r\n\r\n\"Thành công và hạnh phúc của tôi là được làm những điều mình muốn làm tại thời điểm phù hợp cho điều đó\" - Hà Đậu\r\n\r\n\"Thành công là được phát huy hết khả năng của mình và tạo ra giá trị cho xã hội\" - Thu Hương\r\n\r\n\"Thành công là hiểu được mình muốn gì và giúp người khác phát huy được năng lực của họ\" - Thi Anh Đào\r\n\r\n\"Thành công là được là chính mình và giúp đỡ người khác\" - Su Tan\r\n\r\nMã hàng\t9786045693261\r\nNhà Cung Cấp\tCông ty TNHH Văn Hóa Ánh Dương\r\nTác giả\tJen VuHuong\r\nNXB\tNXB Phụ Nữ Việt Nam\r\nNăm XB\t2020\r\nTrọng lượng (gr)\t373\r\nKích Thước Bao Bì\t23 x 15 x 1 cm\r\nSố trang\t220\r\nHình thức\tBìa Mềm\r\nSản phẩm hiển thị trong\t\r\nCông ty TNHH Văn Hóa Ánh Dương\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Nhân vật - Bài Học Kinh doanh bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nThành công, khi bạn thực sự hạnh phúc với chính con người bạn trở thành - Thành công theo cách của bạn.\r\n\r\n\"Thành công và hạnh phúc của tôi là được làm những điều mình muốn làm tại thời điểm phù hợp cho điều đó\" - Hà Đậu\r\n\r\n\"Thành công là được phát huy hết khả năng của mình và tạo ra giá trị cho xã hội\" - Thu Hương\r\n\r\n\"Thành công là hiểu được mình muốn gì và giúp người khác phát huy được năng lực của họ\" - Thi Anh Đào\r\n\r\n\"Thành công là được là chính mình và giúp đỡ người khác\" - Su Tan",
        "public": true,
        "publish_date": "2020",
        "author": "Jen VuHuong",
        "amount": 220,
        "number_of_page": 220,
        "sold": 1,
        "rating": 5,
        "price": 80000,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/i/m/image_219754.jpg",
        "slug": "duoi-tang-bang-cua-su-thanh-cong-cau-chuyen-khoi-nghiep-nu-doanh-nhan",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 13,
            "name": "KINH TẾ - KINH DOANH",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 315,
        "name": "Tư Duy Tận Dụng - Lấy Ít Thắng Nhiều (Tái Bản 2020)",
        "description": "Jon Sanders, giám đốc hệ thống đề xuất phim của Netflix, chịu trách nhiệm cải tiến phần mềm nội bộ Cinematch. Mặc dù rất cố gắng, các chuyên gia toán và máy tính của Sanders vẫn không thể hoàn thành nhiệm vụ. Thế là, dưới sự chỉ đạo của CEO Reed Hastings, Sanders quyết định thực hiện một nước đi rất khác biệt đã từng được Napoleon III sử dụng: tận dụng nguồn lực từ bên ngoài.\r\n\r\nNetflix tuyên bố thưởng 1 triệu đô la cho nhóm đầu tiên có thể tăng độ chính xác của các đề xuất từ Cinematch lên thêm 10%. Và thật kì lạ, cuối cùng, vấn đề của Cinematch lại được giải quyết dựa trên một nguồn lực kì lạ—một hiểu biết không liên quan lắm đến toán học hay máy tính.\r\n\r\nQuanh ta vẫn còn đó những nguồn lực tương tự—những nguồn lực đang say ngủ có thể giải quyết các vấn đề tưởng chừng như không thể giải quyết. Đã đến lúc ngưng cuộc đua tích lũy và bắt đầu đánh thức những nguồn lực tiềm tàng luôn ở cạnh bên mình.\r\n\r\nTrong quyển sách này, bạn sẽ được nghe kể về:\r\n\r\n- Một chú ngựa thông thái có khả năng làm toán, khiến cả châu Âu phải trầm trồ;\r\n\r\n- Một vị tỉ phú đã chi cả núi tiền chỉ để tưới nước cho bãi cỏ nhà mình giữa vụ hạn hán tồi tệ nhất ở California thời hiện đại; và\r\n\r\n- Một họa sĩ tài ba đã tận dụng chứng run tay của mình để vẽ nên những tác phẩm vô cùng độc đáo.\r\n\r\nChúng ta cũng sẽ được biết:\r\n\r\n- Danh họa Claude Monet khác biệt với những họa sĩ giỏi thông thường ở điểm nào;\r\n\r\n- Quá trình đảm nhiệm vai trò cha mẹ có thể giúp gia tăng kĩ năng lãnh đạo như thế nào; và\r\n\r\n- Tại sao những nhà lãnh đạo phản ứng nhanh lại cũng thường phản ứng chính xác hơn.\r\n\r\nMã hàng\t9786049228810\r\nTên Nhà Cung Cấp\tCông ty TNHH Ecoblader\r\nTác giả\tScott Sonenshein\r\nNgười Dịch\tNguyễn Hạo Nhiên, Nguyễn Hưởng\r\nNXB\tNXB Kinh tế TPHCM\r\nNăm XB\t2020\r\nNgôn Ngữ\tTiếng Việt\r\nTrọng lượng (gr)\t300\r\nKích Thước Bao Bì\t24 x 16 cm\r\nSố trang\t240\r\nHình thức\tBìa Mềm\r\nSản phẩm hiển thị trong\t\r\nCông ty TNHH Ecoblader\r\nSách Kinh Tế\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Nhân vật - Bài Học Kinh doanh bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nJon Sanders, giám đốc hệ thống đề xuất phim của Netflix, chịu trách nhiệm cải tiến phần mềm nội bộ Cinematch. Mặc dù rất cố gắng, các chuyên gia toán và máy tính của Sanders vẫn không thể hoàn thành nhiệm vụ. Thế là, dưới sự chỉ đạo của CEO Reed Hastings, Sanders quyết định thực hiện một nước đi rất khác biệt đã từng được Napoleon III sử dụng: tận dụng nguồn lực từ bên ngoài.\r\n\r\nNetflix tuyên bố thưởng 1 triệu đô la cho nhóm đầu tiên có thể tăng độ chính xác của các đề xuất từ Cinematch lên thêm 10%. Và thật kì lạ, cuối cùng, vấn đề của Cinematch lại được giải quyết dựa trên một nguồn lực kì lạ—một hiểu biết không liên quan lắm đến toán học hay máy tính.\r\n\r\nQuanh ta vẫn còn đó những nguồn lực tương tự—những nguồn lực đang say ngủ có thể giải quyết các vấn đề tưởng chừng như không thể giải quyết. Đã đến lúc ngưng cuộc đua tích lũy và bắt đầu đánh thức những nguồn lực tiềm tàng luôn ở cạnh bên mình.\r\n\r\nTrong quyển sách này, bạn sẽ được nghe kể về:\r\n\r\n- Một chú ngựa thông thái có khả năng làm toán, khiến cả châu Âu phải trầm trồ;\r\n\r\n- Một vị tỉ phú đã chi cả núi tiền chỉ để tưới nước cho bãi cỏ nhà mình giữa vụ hạn hán tồi tệ nhất ở California thời hiện đại; và\r\n\r\n- Một họa sĩ tài ba đã tận dụng chứng run tay của mình để vẽ nên những tác phẩm vô cùng độc đáo.\r\n\r\nChúng ta cũng sẽ được biết:\r\n\r\n- Danh họa Claude Monet khác biệt với những họa sĩ giỏi thông thường ở điểm nào;\r\n\r\n- Quá trình đảm nhiệm vai trò cha mẹ có thể giúp gia tăng kĩ năng lãnh đạo như thế nào; và\r\n\r\n- Tại sao những nhà lãnh đạo phản ứng nhanh lại cũng thường phản ứng chính xác hơn.",
        "public": true,
        "publish_date": "2020",
        "author": "Scott Sonenshein",
        "amount": 60,
        "number_of_page": 240,
        "sold": 3455,
        "rating": 5,
        "price": 110500,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/i/m/image_189306_1.jpg",
        "slug": "tu-duy-tan-dung-lay-it-thang-nhieu-tai-ban-2020",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-10T03:47:46.690Z",
        "category": {
            "id": 13,
            "name": "KINH TẾ - KINH DOANH",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 316,
        "name": "Bùng Nổ Mạng Lưới Kinh Doanh Đa Chiều",
        "description": "Bùng Nổ Mạng Lưới Kinh Doanh Đa Chiều\r\n\r\nDù bạn đang nung nấu kế hoạch khởi nghiệp hay đang cần mẫn phát triển doanh nghiệp của bản thân “Bùng nổ mạng lưới kinh doanh đa chiều” chính là cuốn sách kinh doanh hữu ích dành cho bạn. Bằng những câu chuyện gần gũi về các chủ doanh nghiệp nhỏ, bạn sẽ nhận được vô vàn kiến thức thực tế có thể áp dụng ngay, nhằm lèo lái doanh nghiệp và có thể cả cuộc đời của bạn vượt qua những thách thức để đi theo con đường mà mình mong muốn.\r\n\r\nCuốn sách này sẽ giúp ích cho bạn:\r\n\r\n- Xây dựng một hệ sinh thái vững chắc trước khi tạo nên một đế chế.\r\n\r\n- Vượt ra khỏi tầm nhìn thông thường để tìm kiếm thị trường mới tiềm năng.\r\n\r\n- Xác định chính xác tập khách hàng lý tưởng, để từ đó tạo ra sản phẩm hoặc dịch vụ đáp ứng được nhu cầy của họ.\r\n\r\n- Tận dụng mạng xã hội để quảng bá bản thân cũng như thu hút đối tác.\r\n\r\nMã hàng\t9786043932577\r\nTên Nhà Cung Cấp\tBách Việt\r\nTác giả\tPamela Slim\r\nNgười Dịch\tThùy Anh\r\nNXB\tLao Động\r\nNăm XB\t2023\r\nNgôn Ngữ\tTiếng Việt\r\nTrọng lượng (gr)\t400\r\nKích Thước Bao Bì\t20.5 x 14.5 x 1.8 cm\r\nSố trang\t372\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Nhân vật - Bài Học Kinh doanh bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nBùng Nổ Mạng Lưới Kinh Doanh Đa Chiều\r\n\r\nDù bạn đang nung nấu kế hoạch khởi nghiệp hay đang cần mẫn phát triển doanh nghiệp của bản thân “Bùng nổ mạng lưới kinh doanh đa chiều” chính là cuốn sách kinh doanh hữu ích dành cho bạn. Bằng những câu chuyện gần gũi về các chủ doanh nghiệp nhỏ, bạn sẽ nhận được vô vàn kiến thức thực tế có thể áp dụng ngay, nhằm lèo lái doanh nghiệp và có thể cả cuộc đời của bạn vượt qua những thách thức để đi theo con đường mà mình mong muốn.\r\n\r\nCuốn sách này sẽ giúp ích cho bạn:\r\n\r\n- Xây dựng một hệ sinh thái vững chắc trước khi tạo nên một đế chế.\r\n\r\n- Vượt ra khỏi tầm nhìn thông thường để tìm kiếm thị trường mới tiềm năng.\r\n\r\n- Xác định chính xác tập khách hàng lý tưởng, để từ đó tạo ra sản phẩm hoặc dịch vụ đáp ứng được nhu cầy của họ.\r\n\r\n- Tận dụng mạng xã hội để quảng bá bản thân cũng như thu hút đối tác.",
        "public": true,
        "publish_date": "2022",
        "author": "Pamela Slim",
        "amount": 200,
        "number_of_page": 372,
        "sold": 1,
        "rating": 5,
        "price": 125100,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/9/7/9786043932577.jpg",
        "slug": "bung-no-mang-luoi-kinh-doanh-da-chieu",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 13,
            "name": "KINH TẾ - KINH DOANH",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 317,
        "name": "Warren Buffett - Nhà Đầu Tư Vĩ Đại Nhất Thế Giới Dưới Góc Nhìn Truyền Thông (Tái Bản 2022)",
        "description": "Trong cuốn sách này, tác giả Loomis đã tổng hợp và cập nhật những bài báo thú vị nhất về Buffett được Fortune đăng trong giai đoạn 1966 – 2012, gồm 13 bài báo trang bìa và hàng tá những bài báo do chính Buffett viết. Loomis đã đưa ra bình luận về mỗi bài báo dựa trên nội dung và quan điểm của chính bà, qua đó độc giả sẽ có cái nhìn thấu đáo hơn về các chiến lược đầu tư, tư duy về quản lý, các hoạt động từ thiện, chính sách công và thậm chí là cả những nguyên tắc làm cha mẹ của ông.\r\n\r\n“Loomis đã dệt nên một tuyệt tác bằng ngôn ngữ về một nhà đầu tư vĩ đại trong thời đại của chúng ta.” – Publisher Weekly\r\n\r\n“Những nhà đầu tư nghiêm túc cũng như những ai hứng thú với lịch sử của Berkshire Hathaway và các ý tưởng làm từ thiện của Buffett sẽ tìm thấy những mẩu vàng nằm lẫn trong kho báu về Buffett của Fortune.” – Kirkus Reviews\r\n\r\nMã hàng\t8935251418910\r\nTên Nhà Cung Cấp\tAlpha Books\r\nTác giả\tCarol J Loomis\r\nNgười Dịch\tKim Phúc\r\nNXB\tCông Thương\r\nNăm XB\t2022\r\nTrọng lượng (gr)\t500\r\nKích Thước Bao Bì\t24 x 16 cm\r\nSố trang\t588\r\nHình thức\tBìa Mềm\r\nSản phẩm hiển thị trong\t\r\nAlpha Books\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Nhân vật - Bài Học Kinh doanh bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nTrong cuốn sách này, tác giả Loomis đã tổng hợp và cập nhật những bài báo thú vị nhất về Buffett được Fortune đăng trong giai đoạn 1966 – 2012, gồm 13 bài báo trang bìa và hàng tá những bài báo do chính Buffett viết. Loomis đã đưa ra bình luận về mỗi bài báo dựa trên nội dung và quan điểm của chính bà, qua đó độc giả sẽ có cái nhìn thấu đáo hơn về các chiến lược đầu tư, tư duy về quản lý, các hoạt động từ thiện, chính sách công và thậm chí là cả những nguyên tắc làm cha mẹ của ông.\r\n\r\n“Loomis đã dệt nên một tuyệt tác bằng ngôn ngữ về một nhà đầu tư vĩ đại trong thời đại của chúng ta.” – Publisher Weekly\r\n\r\n“Những nhà đầu tư nghiêm túc cũng như những ai hứng thú với lịch sử của Berkshire Hathaway và các ý tưởng làm từ thiện của Buffett sẽ tìm thấy những mẩu vàng nằm lẫn trong kho báu về Buffett của Fortune.” – Kirkus Reviews",
        "public": true,
        "publish_date": "2021",
        "author": "Carol J Loomis",
        "amount": 588,
        "number_of_page": 588,
        "sold": 123,
        "rating": 5,
        "price": 228650,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/8/9/8935251418910.jpg",
        "slug": "warren-buffett-nha-dau-tu-vi-dai-nhat-the-gioi-duoi-goc-nhin-truyen-thong-tai-ban-2022",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-10T03:47:46.686Z",
        "category": {
            "id": 13,
            "name": "KINH TẾ - KINH DOANH",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 318,
        "name": "Jeff Bezos Và Kỷ Nguyên Amazon (Tái Bản 2019)",
        "description": "Amazon là câu chuyện của một người sáng lập đầy tài năng đã hoàn toàn tự mình định hướng tầm nhìn chiến lược,” Eric Schmidt, chủ tịch của Google – một đối thủ cạnh tranh trực tiếp của Amazon, phát biểu. Chính bản thân ông cũng là thành viên của dịch vụ Amazon Prime – giao hàng trong hai ngày của Amazon. “Sẽ chẳng có ví dụ nào hay hơn. Có lẽ chỉ có thể là Apple, nhưng người ta quên rằng hầu hết mọi người tin Amazon đã sụp đổ do không đạt được quy mô kinh doanh cần thiết để trang trải kết cấu chi phí. Công ty liên tục thua lỗ hàng trăm triệu đô la. Nhưng Jeff quả thực là người có tài ăn nói và rất thông minh. Ông là một mẫu người sáng lập doanh nghiệp có chuyên môn điển hình nên hiểu từng chi tiết nhỏ nhất và cẩn trọng xem xét mọi khía cạnh hơn bất kỳ ai.”\r\n\r\nMặc dù giá cổ phiếu của công ty tăng cao chóng mặt trong thời gian gần đây, nhưng Amazon vẫn là công ty ẩn chứa những vấn đề kỳ lạ. Những chỉ số quan trọng trên bảng cân đối kế toán nổi tiếng là thiếu sức sống, và việc mở rộng vào thị trường và phân mục sản phẩm mới thậm chí khiến công ty có kết quả kinh doanh thua lỗ trong năm 2012. Nhưng Phố Wall dường như không quan tâm đến số liệu này. Jeff Bezos đưa ra những tuyên bố mạnh mẽ về việc đầu tư xây dựng công ty dài hạn nên tạo dựng lòng tin từ những cổ đông. Những nhà đầu tư sẵn sàng kiên nhẫn chờ đợi một ngày Jeff quyết định chậm lại quá trình mở rộng và nhận được lợi nhuận bền vững.\r\n\r\nBezos hoàn toàn không để ý tới ý kiến của người khác. Ông có khả năng giải quyết vấn đề, có tầm nhìn bao quát của một vị tướng chỉ huy trong cuộc chiến cạnh tranh và luôn hướng tới làm hài lòng khách hàng và cung cấp dịch vụ như giao hàng miễn phí. Ông có những tham vọng vô cùng lớn – không chỉ đối với Amazon, mà còn để thúc đẩy mở rộng giới hạn của khoa học và xây dựng lại lĩnh vực truyền thông. Không chỉ thành lập công ty nghiên cứu vũ trụ Blue Origin của riêng mình, Bezos còn thâu tóm tờ báo gặp khó khăn Washington Postvào tháng 8 năm 2013 với giá 250 triệu đô la, một thương vụ gây choáng váng cho giới truyền thông.\r\n\r\nNhư nhiều nhân viên dưới quyền chứng thực, làm việc với Bezos rất khó khăn và vất vả. Mặc dù, nổi tiếng với nụ cười nồng nhiệt và vui vẻ, Bezos có thể nổi giận gay gắt giống như người sáng lập của Apple, Steve Jobs, người có thể làm khiếp sợ bất kỳ nhân viên nào bước vào thang máy cùng ông. Bezos theo chủ nghĩa lãnh đạo hoàn hảo, quan tâm theo dõi đến từng chi tiết nhỏ nhất, liên tục cho ra những ý tưởng mới và phản ứng gay gắt với những nỗ lực làm việc không đáp ứng những yêu cầu nghiêm ngặt của ông.\r\n\r\nGiống như Jobs, Bezos thuộc tuýp người có khả năng bóp méo thực tại – vẽ ra viễn cảnh tươi sáng đầy thuyết phục nhưng rút cuộc thì lại chẳng mấy khi khiến họ thỏa mãn về công ty. Ông thường nói rằng sứ mệnh của Amazon là “phải nâng cao chuẩn mực trong các lĩnh vực và trên toàn thế giới với mục tiêu tập trung hướng tới khách hàng.” Bezos và nhân viên thực sự tập trung hướng tới đem lại lợi ích cho khách hàng, nhưng đồng thời cũng cạnh tranh không ngừng với đối thủ và thậm chí với cả đối tác. Bezos thích nói rằng thị trường Amazon tham gia cạnh tranh kinh doanh rộng lớn với rất nhiều cơ hội cho nhiều công ty thành công. Điều này có lẽ đúng, nhưng rõ ràng Amazon góp phần gây thiệt hại hoặc phá hủy những đối thủ cạnh tranh dù có quy mô kinh doanh lớn hay nhỏ, rất nhiều trong số đó là những thương hiệu được thế giới biết đến như: Circuit City. Borders. Best Buy.Barnes & Noble.\r\n\r\nNgười Mỹ nói chung cảm thấy lo lắng về việc tập trung sức mạnh của những tập đoàn lớn, đặc biệt khi các tập đoàn đó có trụ sở ở những thành phố xa xôi. Thành công của những công ty này có thể thay đổi phong cách sống của toàn cộng đồng dân cư. Walmart là trường hợp điển hình phải đối mặt với sự hoài nghi này cùng với những cái tên khác như Sears, Woolworth’s, và gã bán lẻ tạp phẩm khổng lồ A&P phải đối mặt với vụ kiện chống độc quyền có thể gây phá sản trong suốt những năm 1940. Người Mỹ đổ xô tới những nhà bán lẻ lớn vì sự tiện lợi và giá thành thấp. Nhưng ở một mức giá nhất định, những công ty này nhận được lợi nhuận lớn gây mâu thuẫn trong cộng đồng. Chúng tôi muốn hàng hóa giá rẻ, nhưng chúng tôi cũng không thực sự muốn bất kỳ ai phải từ bỏ những cửa hàng độc lập quy mô gia đình trên những con phố hoặc những cửa hàng sách nhỏ đã kinh doanh trong nhiều thập kỷ do sự phổ biến của chuỗi cửa hàng sách như Barnes & Noble và giờ đây là Amazon\r\n\r\nMã hàng\t8935280902589\r\nTên Nhà Cung Cấp\tThái Hà\r\nTác giả\tBrad Stone\r\nNXB\tNXB Công Thương\r\nNăm XB\t2019\r\nTrọng lượng (gr)\t420\r\nKích Thước Bao Bì\t15.5 x 24 x 2\r\nSố trang\t403\r\nHình thức\tBìa Mềm\r\nSản phẩm hiển thị trong\t\r\nRƯỚC DEAL LINH ĐÌNH VUI ĐÓN TRUNG THU\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Nhân vật - Bài Học Kinh doanh bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nAmazon là câu chuyện của một người sáng lập đầy tài năng đã hoàn toàn tự mình định hướng tầm nhìn chiến lược,” Eric Schmidt, chủ tịch của Google – một đối thủ cạnh tranh trực tiếp của Amazon, phát biểu. Chính bản thân ông cũng là thành viên của dịch vụ Amazon Prime – giao hàng trong hai ngày của Amazon. “Sẽ chẳng có ví dụ nào hay hơn. Có lẽ chỉ có thể là Apple, nhưng người ta quên rằng hầu hết mọi người tin Amazon đã sụp đổ do không đạt được quy mô kinh doanh cần thiết để trang trải kết cấu chi phí. Công ty liên tục thua lỗ hàng trăm triệu đô la. Nhưng Jeff quả thực là người có tài ăn nói và rất thông minh. Ông là một mẫu người sáng lập doanh nghiệp có chuyên môn điển hình nên hiểu từng chi tiết nhỏ nhất và cẩn trọng xem xét mọi khía cạnh hơn bất kỳ ai.”\r\n\r\nMặc dù giá cổ phiếu của công ty tăng cao chóng mặt trong thời gian gần đây, nhưng Amazon vẫn là công ty ẩn chứa những vấn đề kỳ lạ. Những chỉ số quan trọng trên bảng cân đối kế toán nổi tiếng là thiếu sức sống, và việc mở rộng vào thị trường và phân mục sản phẩm mới thậm chí khiến công ty có kết quả kinh doanh thua lỗ trong năm 2012. Nhưng Phố Wall dường như không quan tâm đến số liệu này. Jeff Bezos đưa ra những tuyên bố mạnh mẽ về việc đầu tư xây dựng công ty dài hạn nên tạo dựng lòng tin từ những cổ đông. Những nhà đầu tư sẵn sàng kiên nhẫn chờ đợi một ngày Jeff quyết định chậm lại quá trình mở rộng và nhận được lợi nhuận bền vững.\r\n\r\nBezos hoàn toàn không để ý tới ý kiến của người khác. Ông có khả năng giải quyết vấn đề, có tầm nhìn bao quát của một vị tướng chỉ huy trong cuộc chiến cạnh tranh và luôn hướng tới làm hài lòng khách hàng và cung cấp dịch vụ như giao hàng miễn phí. Ông có những tham vọng vô cùng lớn – không chỉ đối với Amazon, mà còn để thúc đẩy mở rộng giới hạn của khoa học và xây dựng lại lĩnh vực truyền thông. Không chỉ thành lập công ty nghiên cứu vũ trụ Blue Origin của riêng mình, Bezos còn thâu tóm tờ báo gặp khó khăn Washington Postvào tháng 8 năm 2013 với giá 250 triệu đô la, một thương vụ gây choáng váng cho giới truyền thông.\r\n\r\nNhư nhiều nhân viên dưới quyền chứng thực, làm việc với Bezos rất khó khăn và vất vả. Mặc dù, nổi tiếng với nụ cười nồng nhiệt và vui vẻ, Bezos có thể nổi giận gay gắt giống như người sáng lập của Apple, Steve Jobs, người có thể làm khiếp sợ bất kỳ nhân viên nào bước vào thang máy cùng ông. Bezos theo chủ nghĩa lãnh đạo hoàn hảo, quan tâm theo dõi đến từng chi tiết nhỏ nhất, liên tục cho ra những ý tưởng mới và phản ứng gay gắt với những nỗ lực làm việc không đáp ứng những yêu cầu nghiêm ngặt của ông.\r\n\r\nGiống như Jobs, Bezos thuộc tuýp người có khả năng bóp méo thực tại – vẽ ra viễn cảnh tươi sáng đầy thuyết phục nhưng rút cuộc thì lại chẳng mấy khi khiến họ thỏa mãn về công ty. Ông thường nói rằng sứ mệnh của Amazon là “phải nâng cao chuẩn mực trong các lĩnh vực và trên toàn thế giới với mục tiêu tập trung hướng tới khách hàng.” Bezos và nhân viên thực sự tập trung hướng tới đem lại lợi ích cho khách hàng, nhưng đồng thời cũng cạnh tranh không ngừng với đối thủ và thậm chí với cả đối tác. Bezos thích nói rằng thị trường Amazon tham gia cạnh tranh kinh doanh rộng lớn với rất nhiều cơ hội cho nhiều công ty thành công. Điều này có lẽ đúng, nhưng rõ ràng Amazon góp phần gây thiệt hại hoặc phá hủy những đối thủ cạnh tranh dù có quy mô kinh doanh lớn hay nhỏ, rất nhiều trong số đó là những thương hiệu được thế giới biết đến như: Circuit City. Borders. Best Buy.Barnes & Noble.\r\n\r\nNgười Mỹ nói chung cảm thấy lo lắng về việc tập trung sức mạnh của những tập đoàn lớn, đặc biệt khi các tập đoàn đó có trụ sở ở những thành phố xa xôi. Thành công của những công ty này có thể thay đổi phong cách sống của toàn cộng đồng dân cư. Walmart là trường hợp điển hình phải đối mặt với sự hoài nghi này cùng với những cái tên khác như Sears, Woolworth’s, và gã bán lẻ tạp phẩm khổng lồ A&P phải đối mặt với vụ kiện chống độc quyền có thể gây phá sản trong suốt những năm 1940. Người Mỹ đổ xô tới những nhà bán lẻ lớn vì sự tiện lợi và giá thành thấp. Nhưng ở một mức giá nhất định, những công ty này nhận được lợi nhuận lớn gây mâu thuẫn trong cộng đồng. Chúng tôi muốn hàng hóa giá rẻ, nhưng chúng tôi cũng không thực sự muốn bất kỳ ai phải từ bỏ những cửa hàng độc lập quy mô gia đình trên những con phố hoặc những cửa hàng sách nhỏ đã kinh doanh trong nhiều thập kỷ do sự phổ biến của chuỗi cửa hàng sách như Barnes & Noble và giờ đây là Amazon",
        "public": true,
        "publish_date": "2019",
        "author": "Brad Stone",
        "amount": 400,
        "number_of_page": 403,
        "sold": 1,
        "rating": 5,
        "price": 93500,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/i/m/image_190426.jpg",
        "slug": "jeff-bezos-va-ky-nguyen-amazon-tai-ban-2019",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 13,
            "name": "KINH TẾ - KINH DOANH",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 319,
        "name": "Nokia - Từ Sụp Đổ Đến Hồi Sinh",
        "description": "Sự thống trị tuyệt đối của Nokia tạo nên sự tự mãn trong công ty. Các cấp lãnh đạo trở nên chủ quan và không hề nắm bắt tình hình thực tế. Nokia dần tụt lại trong cuộc chiến smartphone và đứng trước nguy cơ phá sản.\r\n\r\nVị chủ tịch mới Risto Siilasma đã giúp công ty trỗi dậy mạnh mẽ với tinh thần “lạc quan hoang tưởng”. Trong Nokia – Từ sụp đổ đến hồi sinh, ông sẽ kể về hành trình đưa Nokia từ vực sâu trở lại vị thế một người khổng lồ công nghệ.\r\n\r\nĐầu những năm 2000, Nokia thống trị hoàn toàn ngành điện thoại di động. Tuy vậy, khi “cuộc chiến smartphone” mới mẻ nổ ra với sự trỗi dậy của iPhone – Apple và điện thoại Android – Google, Nokia ngày càng tụt hậu và dần sụp đổ.\r\n\r\nTrong Nokia – Từ sụp đổ đến hồi sinh, bạn sẽ học được rằng:\r\n\r\nViệc đủ hoang tưởng để luôn chuẩn bị sẵn sàng cho tình huống tồi tệ nhất thực chất giúp bạn lạc quan về những cơ hội.\r\n\r\nTinh thần trách nhiệm và niềm tin là chìa khóa để thành công, và cần liên tục được củng cố.\r\n\r\nCốt yếu của lãnh đạo với tinh thần khởi nghiệp là học hỏi – là coi từng thách thức, từng vấn đề, từng tin tức xấu là một cơ hội để học hỏi và hoàn thiện. Cuốn sách này là một bộ quy tắc mang t犈nh cảnh báo và thực tiễn về cách xác định và hành động trước những mối đe dọa và cơ hội. Bạn sẽ phát triển khả năng tiên đoán sự việc nhạy bén, mở rộng các lựa chọn, đổi mới – nếu cần thiết – bản thân bạn và tổ chức của bạn.\r\n\r\nCho dù bạn đang quản lý một đội nhóm hay một phòng ban trong doanh nghiệp, đang lãnh đạo một công ty nhỏ hay một tập đoàn đa quốc gia, đang gây dựng một công ty khởi nghiệp hay theo đuổi một sự nghiệp độc lập, những kỹ năng và chiến lược thực tế trong cuốn sách này sẽ giúp bạn và tổ chức phát triển mạnh mẽ, bất chấp những biến động trong tương lai.\r\n\r\nMã hàng\t8936066687539\r\nTên Nhà Cung Cấp\t1980 Books\r\nTác giả\tRisto Siilasmaa\r\nNgười Dịch\tDương Thục Nữ\r\nNXB\tNXB Công Thương\r\nNăm XB\t2019\r\nTrọng lượng (gr)\t300\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Nhân vật - Bài Học Kinh doanh bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nSự thống trị tuyệt đối của Nokia tạo nên sự tự mãn trong công ty. Các cấp lãnh đạo trở nên chủ quan và không hề nắm bắt tình hình thực tế. Nokia dần tụt lại trong cuộc chiến smartphone và đứng trước nguy cơ phá sản.\r\n\r\nVị chủ tịch mới Risto Siilasma đã giúp công ty trỗi dậy mạnh mẽ với tinh thần “lạc quan hoang tưởng”. Trong Nokia – Từ sụp đổ đến hồi sinh, ông sẽ kể về hành trình đưa Nokia từ vực sâu trở lại vị thế một người khổng lồ công nghệ.\r\n\r\nĐầu những năm 2000, Nokia thống trị hoàn toàn ngành điện thoại di động. Tuy vậy, khi “cuộc chiến smartphone” mới mẻ nổ ra với sự trỗi dậy của iPhone – Apple và điện thoại Android – Google, Nokia ngày càng tụt hậu và dần sụp đổ.\r\n\r\nTrong Nokia – Từ sụp đổ đến hồi sinh, bạn sẽ học được rằng:\r\n\r\nViệc đủ hoang tưởng để luôn chuẩn bị sẵn sàng cho tình huống tồi tệ nhất thực chất giúp bạn lạc quan về những cơ hội.\r\n\r\nTinh thần trách nhiệm và niềm tin là chìa khóa để thành công, và cần liên tục được củng cố.\r\n\r\nCốt yếu của lãnh đạo với tinh thần khởi nghiệp là học hỏi – là coi từng thách thức, từng vấn đề, từng tin tức xấu là một cơ hội để học hỏi và hoàn thiện. Cuốn sách này là một bộ quy tắc mang t犈nh cảnh báo và thực tiễn về cách xác định và hành động trước những mối đe dọa và cơ hội. Bạn sẽ phát triển khả năng tiên đoán sự việc nhạy bén, mở rộng các lựa chọn, đổi mới – nếu cần thiết – bản thân bạn và tổ chức của bạn.\r\n\r\nCho dù bạn đang quản lý một đội nhóm hay một phòng ban trong doanh nghiệp, đang lãnh đạo một công ty nhỏ hay một tập đoàn đa quốc gia, đang gây dựng một công ty khởi nghiệp hay theo đuổi một sự nghiệp độc lập, những kỹ năng và chiến lược thực tế trong cuốn sách này sẽ giúp bạn và tổ chức phát triển mạnh mẽ, bất chấp những biến động trong tương lai.",
        "public": true,
        "publish_date": "2018",
        "author": "Risto Siilasmaa",
        "amount": 300,
        "number_of_page": 300,
        "sold": 1,
        "rating": 5,
        "price": 163000,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_11261.jpg",
        "slug": "nokia-tu-sup-do-den-hoi-sinh",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 13,
            "name": "KINH TẾ - KINH DOANH",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 320,
        "name": "Tăng Trưởng Thông Minh - Growth IQ",
        "description": "https://cdn0.fahasa.com/media/flashmagazine/images/page_images/tang_truong_thong_minh___growth_iq/2022_09_16_15_02_17_1-390x510.jpg“Chúng ta đều muốn doanh nghiệp của mình phát triển, nhưng làm thế nào biến điều đó thành sự thật? Thật may mắn, Tiffani Bova đã có câu trả lời ở đây. Trong cuốn sách thông minh này, cô đã hé lộ 10 con đường tăng trưởng, từ tạo ra một trải nghiệm khách hàng giàu cảm hứng đến gây xáo động việc kinh doanh, cũng như bao tình huống khác. Và cô củng cố những phát hiện của mình bằng các dữ liệu và ví dụ vững chắc từ các công ty đang phát triển mạnh mẽ. Bạn có một lựa chọn: Tiếp tục đi trên những con đường cũ hoặc theo Bova tiến tới tương lai.” — Daniel H. Pink, tác giả của Khi nào: Bí mật khoa học của thời điểm hoàn hảo và Động lực chèo lái hành vi.\r\n\r\n“Ngày nay, quá nhiều công ty dung dưỡng thứ văn hóa vắt kiệt sức lực để theo đuổi tăng trưởng ngắn hạn. Tăng trưởng thông minh là tăng trưởng bền vững và Tiffani Bova đã cho chúng ta thấy cách duy trì nó thông qua việc xây dựng một văn hóa có mục đích và tận dụng thay vì hy sinh sự tận tụy của nguồn nhân lực.” — Arianna Huffington, nhà sáng lập & CEO của Thrive Global, nhà sáng lập của Huffington Post\r\n\r\n__________\r\n\r\nCuốn sách đã đưa ra 10 con đường mà hầu hết các doanh nghiệp muốn tăng trưởng bền vững đều phải đi qua. Nhưng lựa chọn con đường nào vào thời điểm nào là hiệu quả nhất? Kết hợp chúng với nhau như thế nào? Trình tự thực hiện ra sao?\r\n\r\nTrước hết, tác giả Tiffani Bova đã phân tích từng con đường với bối cảnh có thể áp dụng, đồng thời đề xuất những chỉ số cần theo dõi khi chuẩn bị đưa ra từng lựa chọn.\r\n\r\nTiffani Bova còn đưa ra hơn 30 tình huống kinh doanh để minh họa các cơ hội cũng như cạm bẫy ngầm mà mỗi con đường có thể mang lại, và các doanh nghiệp đã thành công và thất bại ra sao khi vận dụng chúng.\r\n\r\nStarbucks, Red Bull, Kylie Cosmetics, Marvel, Netflix và đặc biệt là Amazon đã thành công khi đi theo những con đường này, và vẫn đang không ngừng áp dụng chúng!\r\n\r\nBạn cũng có thể ghi tên mình vào danh sách những người thành công như vậy.\r\n\r\nHãy bắt đầu đặt bước chân vào hành trình tăng trưởng thông minh đi!\r\n\r\nVỀ TÁC GIẢ:\r\n\r\nTiffani Bova là người truyền bá tư tưởng phát triển khách hàng toàn cầu và đột phá sáng tạo tại Salesforce. Trong hơn 20 năm qua, cô đã dẫn dắt nhiều phòng, ban tạo doanh thu tại rất nhiều doanh nghiệp, từ tân binh khởi nghiệp đến những “lão làng” trong danh sách Fortune 500. Cô đã có 10 năm làm việc tại Gartner, công ty nghiên cứu và cố vấn IT hàng đầu thế giới, với tư cách một chuyên gia phân tích và nghiên cứu viên ưu tú. Những quan điểm độc đáo của cô đã giúp Microsoft, Cisco, Hewlett-Packard, IBM, Oracle, SAP, AT&T, Dell, Amazon-AWS và nhiều công ty xuất sắc khác mở rộng thị phần và tăng doanh thu.\r\n\r\nMã hàng\t8935235229334\r\nTên Nhà Cung Cấp\tNhã Nam\r\nTác giả\tTiffani Bova\r\nNgười Dịch\tHoàng Linh\r\nNXB\tNXB Dân Trí\r\nNăm XB\t2021\r\nTrọng lượng (gr)\t560\r\nKích Thước Bao Bì\t20.5 x 14 x 2.7\r\nSố trang\t536\r\nHình thức\tBìa Mềm\r\nSản phẩm hiển thị trong\t\r\nNhã Nam\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Nhân vật - Bài Học Kinh doanh bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\n“Chúng ta đều muốn doanh nghiệp của mình phát triển, nhưng làm thế nào biến điều đó thành sự thật? Thật may mắn, Tiffani Bova đã có câu trả lời ở đây. Trong cuốn sách thông minh này, cô đã hé lộ 10 con đường tăng trưởng, từ tạo ra một trải nghiệm khách hàng giàu cảm hứng đến gây xáo động việc kinh doanh, cũng như bao tình huống khác. Và cô củng cố những phát hiện của mình bằng các dữ liệu và ví dụ vững chắc từ các công ty đang phát triển mạnh mẽ. Bạn có một lựa chọn: Tiếp tục đi trên những con đường cũ hoặc theo Bova tiến tới tương lai.” — Daniel H. Pink, tác giả của Khi nào: Bí mật khoa học của thời điểm hoàn hảo và Động lực chèo lái hành vi.\r\n\r\n“Ngày nay, quá nhiều công ty dung dưỡng thứ văn hóa vắt kiệt sức lực để theo đuổi tăng trưởng ngắn hạn. Tăng trưởng thông minh là tăng trưởng bền vững và Tiffani Bova đã cho chúng ta thấy cách duy trì nó thông qua việc xây dựng một văn hóa có mục đích và tận dụng thay vì hy sinh sự tận tụy của nguồn nhân lực.” — Arianna Huffington, nhà sáng lập & CEO của Thrive Global, nhà sáng lập của Huffington Post\r\n\r\n__________\r\n\r\nCuốn sách đã đưa ra 10 con đường mà hầu hết các doanh nghiệp muốn tăng trưởng bền vững đều phải đi qua. Nhưng lựa chọn con đường nào vào thời điểm nào là hiệu quả nhất? Kết hợp chúng với nhau như thế nào? Trình tự thực hiện ra sao?\r\n\r\nTrước hết, tác giả Tiffani Bova đã phân tích từng con đường với bối cảnh có thể áp dụng, đồng thời đề xuất những chỉ số cần theo dõi khi chuẩn bị đưa ra từng lựa chọn.\r\n\r\nTiffani Bova còn đưa ra hơn 30 tình huống kinh doanh để minh họa các cơ hội cũng như cạm bẫy ngầm mà mỗi con đường có thể mang lại, và các doanh nghiệp đã thành công và thất bại ra sao khi vận dụng chúng.\r\n\r\nStarbucks, Red Bull, Kylie Cosmetics, Marvel, Netflix và đặc biệt là Amazon đã thành công khi đi theo những con đường này, và vẫn đang không ngừng áp dụng chúng!\r\n\r\nBạn cũng có thể ghi tên mình vào danh sách những người thành công như vậy.\r\n\r\nHãy bắt đầu đặt bước chân vào hành trình tăng trưởng thông minh đi!\r\n\r\nVỀ TÁC GIẢ:\r\n\r\nTiffani Bova là người truyền bá tư tưởng phát triển khách hàng toàn cầu và đột phá sáng tạo tại Salesforce. Trong hơn 20 năm qua, cô đã dẫn dắt nhiều phòng, ban tạo doanh thu tại rất nhiều doanh nghiệp, từ tân binh khởi nghiệp đến những “lão làng” trong danh sách Fortune 500. Cô đã có 10 năm làm việc tại Gartner, công ty nghiên cứu và cố vấn IT hàng đầu thế giới, với tư cách một chuyên gia phân tích và nghiên cứu viên ưu tú. Những quan điểm độc đáo của cô đã giúp Microsoft, Cisco, Hewlett-Packard, IBM, Oracle, SAP, AT&T, Dell, Amazon-AWS và nhiều công ty xuất sắc khác mở rộng thị phần và tăng doanh thu.",
        "public": true,
        "publish_date": "2020",
        "author": "Tiffani Bova",
        "amount": 440,
        "number_of_page": 536,
        "sold": 123,
        "rating": 5,
        "price": 169000,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/flashmagazine/images/page_images/tang_truong_thong_minh___growth_iq/2022_09_16_15_02_17_1-390x510.jpg",
        "slug": "tang-truong-thong-minh-growth-iq",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-10T03:47:46.685Z",
        "category": {
            "id": 13,
            "name": "KINH TẾ - KINH DOANH",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 321,
        "name": "Quản Lý Nguồn Nhân Lực Alibaba",
        "description": "Quản Lý Nguồn Nhân Lực Alibaba\r\n\r\nJack Ma : \"Sản phẩm đầu tiên của chúng ta là nhân viên của chúng ta , bởi vì chúng ta tin rằng , nhân viên của chúng ta đã lớn mạnh , sản phẩm của chúng ta tự nhiên sẽ lớn mạnh , dịch vụ của chúng ta sẽ làm tốt , khách hàng mới hài lòng \".\r\n\r\nQuan niệm giá trị công ty có phải chỉ là hình thức nhìn đẹp mắt không hữu dụng không ?\r\n\r\nNhân tài ưu tú nhất có cần phải tương xứng với yêu cầu phát triển của công ty không ?",
        "public": true,
        "publish_date": "2021",
        "author": "Trần Vỹ",
        "amount": 320,
        "number_of_page": 320,
        "sold": 35,
        "rating": 5,
        "price": 93500,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/8/9/8935236425322.jpg",
        "slug": "quan-ly-nguon-nhan-luc-alibaba",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-10T03:47:46.691Z",
        "category": {
            "id": 13,
            "name": "KINH TẾ - KINH DOANH",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 322,
        "name": "Câu Chuyện Thần Kỳ Của Samsung: Từ Kẻ Theo Đuôi Thành Người Dẫn Dắt - Samsung Rising",
        "description": "Dựa trên nhiều năm đưa tin về Samsung cho The Economist, The Wall Street Journal và Time, từ cơ sở của tác giả ở Hàn Quốc, và vô số nguồn tin bên trong và bên ngoài công ty, Geoffrey Cain cung cấp những câu chuyện \"thâm cung bí sử\" đằng sau bức màn của một tập đoàn lớn nhất Hàn Quốc và thế giới công nghệ. Trong nhiều thập kỷ bị giới công nghệ xem như là kẻ mau mắn theo đuôi chứ không phải là người dẫn dắt cách tân, Samsung ngày nay đã phát triển để trở thành công ty dẫn đầu thị trường ở Mỹ và toàn cầu. Họ đã chiếm lĩnh một phần tư thị trường điện thoại thông minh và trở nên cực kỳ sáng tạo trên mọi mặt trận.\r\n\r\n40 năm trước, Samsung là một tập đoàn nông nghiệp ọp ẹp của Hàn Quốc chuyên sản xuất đường, giấy và phân bón, tại một quốc gia lạc hậu có nền kinh tế thuộc thế giới thứ ba. Tuy nhiên, với sự lên ngôi của cuộc cách mạng máy tính cá nhân, Chủ tịch Lee Byung Chul đã bắt đầu một thử nghiệm táo bạo: biến Samsung trở thành nhà cung cấp chip vi tính chủ chốt. Kế hoạch hàng triệu đôla ấy cực kỳ rủi ro. Khiến cho một Steve Jobs trẻ tuổi kinh ngạc phải ngồi xuống với ông để đưa ra lời khuyên, chủ tịch Lee đã bị ám ảnh việc tạo ra một đế chế công nghệ. \"Câu chuyện thần kỳ của Samsung\" đưa chúng ta vào hậu trường của công ty này trong công cuộc nỗ lực phi thường để dẫn đầu về công nghệ. Đây là một trong những nhà cung cấp chính của Apple về công nghệ quan trọng cho iPhone, còn điện thoại Galaxy của chính hãng này thì bán chạy hơn iPhone. Bức ảnh selfie tại giải Oscar làm sập mạng interner cho thấy Samsung là nhà tài trợ thành công nhất với giải thưởng điện ảnh danh giá này.\r\n\r\nNgày nay, Samsung sử dụng hơn 300.000 nhân viên (so với 80.000 của Apple và 48.000 của Google). Doanh thu của công ty đã tăng hơn bốn mươi lần so với năm 1987 và chiếm hơn 20% kim ngạch xuất khẩu của Hàn Quốc. Tuy nhiên, vụ thu hồi thảm hại Galaxy Note 7, với hàng loạt tin tức về việc chiếc điện thoại tự bốc cháy, cho thấy những hiểm họa trong nỗ lực vượt qua Apple bằng bất cứ giá nào của Samsung.\r\n\r\nSâu rộng trong nội bộ, \"Câu chuyện thần kỳ của Samsung\" cho thấy một đấu thủ châu Á quyết tâm và không sợ hãi đã trở thành một thế lực đáng gờm như thế nào.\r\n\r\nMã hàng\t8934974179139\r\nTên Nhà Cung Cấp\tNXB Trẻ\r\nTác giả\tGeoffrey Cain\r\nNgười Dịch\tTrần Trọng Hải Minh\r\nNXB\tNXB Trẻ\r\nNăm XB\t2022\r\nTrọng lượng (gr)\t500\r\nKích Thước Bao Bì\t23 x 15.5 cm x 2\r\nSố trang\t468\r\nHình thức\tBìa Mềm\r\nSản phẩm hiển thị trong\t\r\nNXB Trẻ\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Nhân vật - Bài Học Kinh doanh bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nDựa trên nhiều năm đưa tin về Samsung cho The Economist, The Wall Street Journal và Time, từ cơ sở của tác giả ở Hàn Quốc, và vô số nguồn tin bên trong và bên ngoài công ty, Geoffrey Cain cung cấp những câu chuyện \"thâm cung bí sử\" đằng sau bức màn của một tập đoàn lớn nhất Hàn Quốc và thế giới công nghệ. Trong nhiều thập kỷ bị giới công nghệ xem như là kẻ mau mắn theo đuôi chứ không phải là người dẫn dắt cách tân, Samsung ngày nay đã phát triển để trở thành công ty dẫn đầu thị trường ở Mỹ và toàn cầu. Họ đã chiếm lĩnh một phần tư thị trường điện thoại thông minh và trở nên cực kỳ sáng tạo trên mọi mặt trận.\r\n\r\n40 năm trước, Samsung là một tập đoàn nông nghiệp ọp ẹp của Hàn Quốc chuyên sản xuất đường, giấy và phân bón, tại một quốc gia lạc hậu có nền kinh tế thuộc thế giới thứ ba. Tuy nhiên, với sự lên ngôi của cuộc cách mạng máy tính cá nhân, Chủ tịch Lee Byung Chul đã bắt đầu một thử nghiệm táo bạo: biến Samsung trở thành nhà cung cấp chip vi tính chủ chốt. Kế hoạch hàng triệu đôla ấy cực kỳ rủi ro. Khiến cho một Steve Jobs trẻ tuổi kinh ngạc phải ngồi xuống với ông để đưa ra lời khuyên, chủ tịch Lee đã bị ám ảnh việc tạo ra một đế chế công nghệ. \"Câu chuyện thần kỳ của Samsung\" đưa chúng ta vào hậu trường của công ty này trong công cuộc nỗ lực phi thường để dẫn đầu về công nghệ. Đây là một trong những nhà cung cấp chính của Apple về công nghệ quan trọng cho iPhone, còn điện thoại Galaxy của chính hãng này thì bán chạy hơn iPhone. Bức ảnh selfie tại giải Oscar làm sập mạng interner cho thấy Samsung là nhà tài trợ thành công nhất với giải thưởng điện ảnh danh giá này.\r\n\r\nNgày nay, Samsung sử dụng hơn 300.000 nhân viên (so với 80.000 của Apple và 48.000 của Google). Doanh thu của công ty đã tăng hơn bốn mươi lần so với năm 1987 và chiếm hơn 20% kim ngạch xuất khẩu của Hàn Quốc. Tuy nhiên, vụ thu hồi thảm hại Galaxy Note 7, với hàng loạt tin tức về việc chiếc điện thoại tự bốc cháy, cho thấy những hiểm họa trong nỗ lực vượt qua Apple bằng bất cứ giá nào của Samsung.\r\n\r\nSâu rộng trong nội bộ, \"Câu chuyện thần kỳ của Samsung\" cho thấy một đấu thủ châu Á quyết tâm và không sợ hãi đã trở thành một thế lực đáng gờm như thế nào.",
        "public": true,
        "publish_date": "2021",
        "author": "Geoffrey Cain",
        "amount": 34,
        "number_of_page": 468,
        "sold": 33,
        "rating": 5,
        "price": 195500,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/catalog/product/8/9/8934974179139.jpg",
        "slug": "cau-chuyen-than-ky-cua-samsung-tu-ke-theo-duoi-thanh-nguoi-dan-dat-samsung-rising",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-10T03:47:46.691Z",
        "category": {
            "id": 13,
            "name": "KINH TẾ - KINH DOANH",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 323,
        "name": "Chìa Khóa Vạn Năng - Mở Khóa Bí Mật Trong Thành Công Của Napoleon Hill",
        "description": "Chìa Khóa Vạn Năng - Mở Khóa Bí Mật Trong Thành Công Của Napoleon Hill\r\n\r\nNapoleon Hill là tác giả truyền cảm hứng nổi tiếng người Mỹ với tác phẩm tiêu biểu Nghĩ giàu làm giàu, một trong những cuốn sách bán chạy nhất mọi thời đại được ông viết ra khi mới 25 tuổi. Cuốn sách này đã góp mặt vào nhiều câu chuyện thành công trên thế giới. Với triết lý sắc sảo của mình, ông được mệnh danh là “người tạo ra những nhà triệu phú”.\r\n\r\nTư tưởng của Napoleon Hill có tầm ảnh hưởng mạnh mẽ tới công chúng. Các tác phẩm do ông viết hoặc dựa trên triết lý của ông mang tư tưởng nhạy bén, hợp thời, trở thành chìa khóa giúp chúng ta tiến gần hơn đến thành công.\r\n\r\nSức hấp dẫn lớn của cuốn sách nằm ở chỗ đã chỉ ra những nguồn lực mà mỗi người phải có để thành công, nguồn sức mạnh giúp các cá nhân hiện thực hóa giấc mơ và hoài bão của chính bản thân mình.\r\n\r\nChưa dừng lại đó, khi ở độ tuổi 80, Napoleon Hill tiếp tục viết và cho ra đời Chìa khóa vạn năng (The Master-Key to Riches) - cuốn cẩm nang triết lý rộng lớn hơn về sự giàu có ở mọi khía cạnh, bao gồm cả hạnh phúc và sự hài lòng trong cuộc sống. Bởi thế, đây chắc chắn là cuốn sách đầy đủ hơn, nêu bật sự thịnh vượng thay vì sự giàu có đơn giản về tiền tệ.\r\n\r\nKhi còn là một phóng viên 25 tuổi của tạp chí Thành công, Napoleon Hill đã được cử đi phỏng vấn người giàu nhất ở nước Mỹ: ông trùm ngành thép Andrew Carnegie. Và ngay trong buổi phỏng vấn đó, Carnegie đã đề nghị chia cho Hill phần lớn tài sản của ông. Đó không phải là tiền bạc mà là sự thông thái mà ông tích lũy được về cách bất kì ai cũng có thể trở nên giàu có.\r\n\r\nDựa trên bí quyết thành công của tỷ phú Andrew Carnegie, cuốn sách Chìa khóa vạn năng mô tả chi tiết triết lý vĩ đại nhất về thành công, một cách thực tế nhất. Triết lý này sẽ chỉ cho bạn đọc cách để đạt được thành công trên bất kì con đường nào của cuộc sống, dù là tình yêu, sự giàu có về vật chất, tinh thần hay bất cứ mục tiêu nào khác.\r\n\r\nDo đó, sở hữu Chìa khóa vạn năng, bạn đọc có thể mở ra các giải pháp cho mọi vấn đề mình gặp phải, dễ dàng chuyển hóa những thất bại trong quá khứ thành những tài sản vô giá và đạt được Mười Hai Tài Sản Vĩ Đại, trong đó có cả đảm bảo tài chính.\r\n\r\nNếu Nghĩ giàu làm giàu cung cấp một công thức hoàn hảo để thành công về tài chính thì Chìa khóa vạn năng là cuốn cẩm nang triết lý rộng lớn hơn về sự giàu có ở mọi khía cạnh, bao gồm cả hạnh phúc và sự hài lòng trong cuộc sống.\r\n\r\nMã hàng\t8935210305831\r\nTên Nhà Cung Cấp\tTân Việt\r\nTác giả\tNapoleon Hill\r\nNgười Dịch\tLê Bảo Duy\r\nNXB\tDân Trí\r\nNăm XB\t2022\r\nTrọng lượng (gr)\t350\r\nKích Thước Bao Bì\t20.5 x 14.5 x 1.5 cm\r\nSố trang\t310\r\nHình thức\tBìa Mềm\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Nhân vật - Bài Học Kinh doanh bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nChìa Khóa Vạn Năng - Mở Khóa Bí Mật Trong Thành Công Của Napoleon Hill\r\n\r\nNapoleon Hill là tác giả truyền cảm hứng nổi tiếng người Mỹ với tác phẩm tiêu biểu Nghĩ giàu làm giàu, một trong những cuốn sách bán chạy nhất mọi thời đại được ông viết ra khi mới 25 tuổi. Cuốn sách này đã góp mặt vào nhiều câu chuyện thành công trên thế giới. Với triết lý sắc sảo của mình, ông được mệnh danh là “người tạo ra những nhà triệu phú”.\r\n\r\nTư tưởng của Napoleon Hill có tầm ảnh hưởng mạnh mẽ tới công chúng. Các tác phẩm do ông viết hoặc dựa trên triết lý của ông mang tư tưởng nhạy bén, hợp thời, trở thành chìa khóa giúp chúng ta tiến gần hơn đến thành công.\r\n\r\nSức hấp dẫn lớn của cuốn sách nằm ở chỗ đã chỉ ra những nguồn lực mà mỗi người phải có để thành công, nguồn sức mạnh giúp các cá nhân hiện thực hóa giấc mơ và hoài bão của chính bản thân mình.\r\n\r\nChưa dừng lại đó, khi ở độ tuổi 80, Napoleon Hill tiếp tục viết và cho ra đời Chìa khóa vạn năng (The Master-Key to Riches) - cuốn cẩm nang triết lý rộng lớn hơn về sự giàu có ở mọi khía cạnh, bao gồm cả hạnh phúc và sự hài lòng trong cuộc sống. Bởi thế, đây chắc chắn là cuốn sách đầy đủ hơn, nêu bật sự thịnh vượng thay vì sự giàu có đơn giản về tiền tệ.\r\n\r\nKhi còn là một phóng viên 25 tuổi của tạp chí Thành công, Napoleon Hill đã được cử đi phỏng vấn người giàu nhất ở nước Mỹ: ông trùm ngành thép Andrew Carnegie. Và ngay trong buổi phỏng vấn đó, Carnegie đã đề nghị chia cho Hill phần lớn tài sản của ông. Đó không phải là tiền bạc mà là sự thông thái mà ông tích lũy được về cách bất kì ai cũng có thể trở nên giàu có.\r\n\r\nDựa trên bí quyết thành công của tỷ phú Andrew Carnegie, cuốn sách Chìa khóa vạn năng mô tả chi tiết triết lý vĩ đại nhất về thành công, một cách thực tế nhất. Triết lý này sẽ chỉ cho bạn đọc cách để đạt được thành công trên bất kì con đường nào của cuộc sống, dù là tình yêu, sự giàu có về vật chất, tinh thần hay bất cứ mục tiêu nào khác.\r\n\r\nDo đó, sở hữu Chìa khóa vạn năng, bạn đọc có thể mở ra các giải pháp cho mọi vấn đề mình gặp phải, dễ dàng chuyển hóa những thất bại trong quá khứ thành những tài sản vô giá và đạt được Mười Hai Tài Sản Vĩ Đại, trong đó có cả đảm bảo tài chính.\r\n\r\nNếu Nghĩ giàu làm giàu cung cấp một công thức hoàn hảo để thành công về tài chính thì Chìa khóa vạn năng là cuốn cẩm nang triết lý rộng lớn hơn về sự giàu có ở mọi khía cạnh, bao gồm cả hạnh phúc và sự hài lòng trong cuộc sống.",
        "public": true,
        "publish_date": "2021",
        "author": "Napoleon Hill",
        "amount": 90,
        "number_of_page": 310,
        "sold": 1,
        "rating": 5,
        "price": 123250,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/flashmagazine/images/page_images/chia_khoa_van_nang___mo_khoa_bi_mat_trong_thanh_cong_cua_napoleon_hill/2022_10_14_15_34_16_1-390x510.jpg",
        "slug": "chia-khoa-van-nang-mo-khoa-bi-mat-trong-thanh-cong-cua-napoleon-hill",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 13,
            "name": "KINH TẾ - KINH DOANH",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    },
    {
        "id": 324,
        "name": "7 Mô Hình Khởi Nguồn Ý Tưởng",
        "description": "In ấn, bút chì, bồn cầu xả nước hay pin… tất thảy đều là những ý tưởng vĩ đại của nhân loại. Nhưng chúng khởi nguồn từ đâu? Được nuôi dưỡng trong môi trường nào? Là thành quả của một phút sáng chói hay cả quá trình giũa ngọc giữa đá thô? Và loài người đã tạo ra những đột phá công nghệ để đưa đời sống, xã hội, văn hóa tiến bước ra sao?\r\n\r\nSteven Johnson đã khắc họa nên 7 mô hình góp phần khởi sinh các ý tưởng và phát minh: khả năng liền kề, mạng lưới thể lỏng, linh cảm chậm, may mắn ngẫu nhiên, sai lầm, tái thích nghi và nền tảng. Với cách kể chuyện giản dị mà đầy tính thuyết phục và thông qua các ví dụ cụ thể; từ Darwin, Freud đến đại sảnh của Google và Apple, Johnson đã khảo sát các trung tâm đầu não sáng tạo để rút ra những điểm tương đồng cùng xuất hiện tại những mốc khởi đầu. Từ đó, cách thức ý tưởng ra đời đã hiện lên vô cùng rõ ràng, sinh động.\r\n\r\n\"Một cuốn sách quý giá, tích hợp liên ngành và thật sự nổi bật... Dẫu không chuyên về khoa học nhưng Johnson quả thực là người kể chuyện khoa học hàng đầu.\" – The New York Times\r\n\r\n“Gây kích thích, giải thiêng thánh thần, là cuốn sách nổi bật.” – The Atlantic Monthly\r\n\r\n“Steven Johnson chính là Darwin trong công nghệ. Thông qua các quan sát và cách nhìn nhận thú vị, anh đã khai sáng chúng ta về nguồn gốc các ý tưởng. Làm thể nào để tạo ra những môi trường và mạng lưới thúc đẩy các ý tưởng mới? Johnson đã khám phá ra các kiểu hình giúp trả lời câu hỏi phản biện này.” – Walter Isaacson, tác giả cuốn sách bán chạy nhất Einstein – Cuộc Đời Và Vũ Trụ\r\n\r\n“Johnson là một người thông thái… Thật hứng khởi khi đuổi theo những dòng suy nghĩ không thể đoán định của anh. Để giải thích nguyên do tại sao các ý tưởng có thể làm đảo lộn thế giới, anh đã viện dẫn đến những ngành khoa học khác nhau như hóa học, lịch sử xã hội, địa lý, thậm chí là cả khoa học sinh thái.” – Los Angeles Times\r\n\r\n+TÁC GIẢ:\r\n\r\nSteven Johnson là tác giả của bảy cuốn sách thuộc hàng bán chạy nhất về chủ đề lịch sử ý tưởng. Ông là đồng sáng lập kiêm Tổng biên tập của FEED, trang báo mạng về công nghệ, khoa học và văn hóa. Ngoài ra, ông còn là nhà báo khoa học xuất sắc của các tờ New York Times, Wall Street Journal, Nation… Tạp chí Newsweek đã đưa Steven Johnson vào danh sách “50 người có ảnh hưởng nhất trên Internet”. Năm 2010, ông còn được tờ Prospect  bình chọn bào “Top Ten Brain of Digital Future” (10 Bộ óc vĩ đại của Tương lai kỹ thuật số)\r\n\r\nMã hàng\t8935251411348\r\nTên Nhà Cung Cấp\tAlpha Books\r\nTác giả\tSteven Johnson\r\nNgười Dịch\tThanh Mai, Nguyễn Thị Hà Linh\r\nNXB\tNXB Thế Giới\r\nNăm XB\t2020\r\nTrọng lượng (gr)\t300\r\nKích Thước Bao Bì\t24 x 16 cm x 1.5\r\nSố trang\t298\r\nHình thức\tBìa Mềm\r\nSản phẩm hiển thị trong\t\r\nSách Kinh Tế\r\nSản phẩm bán chạy nhất\tTop 100 sản phẩm Nhân vật - Bài Học Kinh doanh bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nChính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc\r\nIn ấn, bút chì, bồn cầu xả nước hay pin… tất thảy đều là những ý tưởng vĩ đại của nhân loại. Nhưng chúng khởi nguồn từ đâu? Được nuôi dưỡng trong môi trường nào? Là thành quả của một phút sáng chói hay cả quá trình giũa ngọc giữa đá thô? Và loài người đã tạo ra những đột phá công nghệ để đưa đời sống, xã hội, văn hóa tiến bước ra sao?\r\n\r\nSteven Johnson đã khắc họa nên 7 mô hình góp phần khởi sinh các ý tưởng và phát minh: khả năng liền kề, mạng lưới thể lỏng, linh cảm chậm, may mắn ngẫu nhiên, sai lầm, tái thích nghi và nền tảng. Với cách kể chuyện giản dị mà đầy tính thuyết phục và thông qua các ví dụ cụ thể; từ Darwin, Freud đến đại sảnh của Google và Apple, Johnson đã khảo sát các trung tâm đầu não sáng tạo để rút ra những điểm tương đồng cùng xuất hiện tại những mốc khởi đầu. Từ đó, cách thức ý tưởng ra đời đã hiện lên vô cùng rõ ràng, sinh động.\r\n\r\n\"Một cuốn sách quý giá, tích hợp liên ngành và thật sự nổi bật... Dẫu không chuyên về khoa học nhưng Johnson quả thực là người kể chuyện khoa học hàng đầu.\" – The New York Times\r\n\r\n“Gây kích thích, giải thiêng thánh thần, là cuốn sách nổi bật.” – The Atlantic Monthly\r\n\r\n“Steven Johnson chính là Darwin trong công nghệ. Thông qua các quan sát và cách nhìn nhận thú vị, anh đã khai sáng chúng ta về nguồn gốc các ý tưởng. Làm thể nào để tạo ra những môi trường và mạng lưới thúc đẩy các ý tưởng mới? Johnson đã khám phá ra các kiểu hình giúp trả lời câu hỏi phản biện này.” – Walter Isaacson, tác giả cuốn sách bán chạy nhất Einstein – Cuộc Đời Và Vũ Trụ\r\n\r\n“Johnson là một người thông thái… Thật hứng khởi khi đuổi theo những dòng suy nghĩ không thể đoán định của anh. Để giải thích nguyên do tại sao các ý tưởng có thể làm đảo lộn thế giới, anh đã viện dẫn đến những ngành khoa học khác nhau như hóa học, lịch sử xã hội, địa lý, thậm chí là cả khoa học sinh thái.” – Los Angeles Times\r\n\r\n+TÁC GIẢ:\r\n\r\nSteven Johnson là tác giả của bảy cuốn sách thuộc hàng bán chạy nhất về chủ đề lịch sử ý tưởng. Ông là đồng sáng lập kiêm Tổng biên tập của FEED, trang báo mạng về công nghệ, khoa học và văn hóa. Ngoài ra, ông còn là nhà báo khoa học xuất sắc của các tờ New York Times, Wall Street Journal, Nation… Tạp chí Newsweek đã đưa Steven Johnson vào danh sách “50 người có ảnh hưởng nhất trên Internet”. Năm 2010, ông còn được tờ Prospect  bình chọn bào “Top Ten Brain of Digital Future” (10 Bộ óc vĩ đại của Tương lai kỹ thuật số)\r\n\r\n",
        "public": true,
        "publish_date": "2019",
        "author": "Steven Johnson",
        "amount": 12,
        "number_of_page": 298,
        "sold": 1,
        "rating": 5,
        "price": 140250,
        "view": 1,
        "thumbnail": "https://cdn0.fahasa.com/media/flashmagazine/images/page_images/7_mo_hinh_khoi_nguon_y_tuong/2021_06_23_16_11_14_1-390x510.jpg",
        "slug": "7-mo-hinh-khoi-nguon-y-tuong",
        "createdAt": "2024-01-09T14:33:03.473Z",
        "updatedAt": "2024-01-09T14:33:03.473Z",
        "category": {
            "id": 13,
            "name": "KINH TẾ - KINH DOANH",
            "block": false,
            "createdAt": "2024-01-05T11:18:26.134Z",
            "updatedAt": "2024-01-05T11:18:26.134Z"
        },
        "images": []
    }
]

export function toSlug(str: string) {
    str = str.toLowerCase();
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '');

    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, '-');

    // Xóa ký tự - liên tiếp
    str = str.replace(/-+/g, '-');

    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '');

    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '');

    // return
    return str;
}