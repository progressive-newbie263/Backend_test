----------------SCRIPT-----------------------------
Video về backend, full course (JSM)


--------------------------TECH STACK----------------------
+ NodeJS + ExpressJS + MongoDB

+ 3rd party software:
Upstash 
ArcJet (chống sql injection (test) )



-----------------------NỘI DUNG-----------------------------------
1. API – Bồi bàn trong nhà hàng
Hãy tưởng tượng bạn đang ngồi trong một nhà hàng. Bạn không vào bếp tự nấu ăn mà thay vào đó, bạn gọi món từ một thực đơn. Bồi bàn sẽ tiếp nhận yêu cầu của bạn, truyền đạt nó đến nhà bếp, rồi mang món ăn về cho bạn. Ở đây:
+ Bạn là client (frontend).
+ Nhà bếp là server (backend).
+ Bồi bàn chính là API, giúp hai bên giao tiếp với nhau.
+ API đóng vai trò như một cầu nối giữa người dùng và hệ thống backend, đảm bảo dữ liệu được gửi đi và nhận về đúng cách.

2. Database – Nhà kho của nhà hàng
Nhà hàng cần một kho chứa nguyên liệu để có thể chế biến món ăn. Mỗi lần khách gọi món, đầu bếp sẽ lấy nguyên liệu từ kho để nấu. Cơ sở dữ liệu (database) hoạt động theo cách tương tự:

---------------
Khi người dùng yêu cầu thông tin (ví dụ, lịch sử giao dịch), backend sẽ tìm kiếm trong cơ sở dữ liệu và gửi lại kết quả. Để đảm bảo kho hàng không bị lộn xộn, ta cần một hệ thống quản lý – tương tự như cách MongoDB giúp tổ chức dữ liệu có trật tự.
---------------
3. Xác thực (JWT) – Vé vào cửa câu lạc bộ VIP
Giả sử bạn đang đi vào một câu lạc bộ sang trọng, nơi chỉ những khách có thẻ thành viên mới được vào. Khi bạn đến cửa, nhân viên bảo vệ kiểm tra thẻ và quyết định xem bạn có đủ điều kiện vào hay không. JWT (JSON Web Token) hoạt động theo cơ chế tương tự:

---------------
Khi người dùng đăng nhập, hệ thống sẽ cấp cho họ một "vé" (token).
Mỗi lần người dùng muốn truy cập thông tin quan trọng, hệ thống sẽ kiểm tra vé này để xác nhận danh tính. Nhờ vậy, chỉ những người có quyền mới có thể thực hiện một số hành động nhất định, bảo vệ dữ liệu khỏi truy cập trái phép.
---------------


4. Xử lý lỗi – Đầu bếp có chiến lược dự phòng
Trong nhà hàng, đôi khi một số món có thể hết nguyên liệu. Khi đó, thay vì để khách đợi mãi, bồi bàn sẽ thông báo ngay lập tức hoặc gợi ý món khác. Hệ thống backend cũng cần cơ chế xử lý lỗi tương tự:

Nếu một API bị lỗi, thay vì để trang web hiển thị lỗi trắng xóa, hệ thống có thể gửi một thông báo có ý nghĩa hơn, giúp người dùng biết phải làm gì tiếp theo.
Một chiến lược tốt có thể bao gồm trả về mã lỗi hợp lý (404 nếu không tìm thấy, 500 nếu có lỗi máy chủ) để giúp cả người dùng lẫn lập trình viên dễ dàng xác định vấn đề.
5. Triển khai lên VPS – Chuyển từ bếp nhà sang nhà hàng chuyên nghiệp
Bạn có thể nấu ăn ngon ở nhà, nhưng nếu muốn mở một nhà hàng thực sự, bạn cần một địa điểm chuyên nghiệp với bếp công nghiệp và đội ngũ phục vụ. Tương tự, khi ứng dụng backend của bạn đã chạy ổn định trên máy tính cá nhân, bạn cần triển khai nó lên một máy chủ (VPS) để có thể phục vụ nhiều người dùng cùng lúc.



------------------NOTE:!!!----------------------------
Quá trình này bao gồm:

Chuyển mã nguồn lên máy chủ.
Cấu hình để hệ thống luôn hoạt động, ngay cả khi có lỗi.
Đảm bảo bảo mật, tránh các lỗ hổng dễ bị tấn công.
Kết luận
Thay vì chỉ hướng dẫn cách viết code, video này giúp người xem hiểu sâu hơn về backend thông qua các ví dụ đời thực. Khi hiểu được bản chất, bạn sẽ dễ dàng áp dụng nó vào các dự án thực tế mà không chỉ làm theo từng bước một cách máy móc.



==========================BONUS===================================
- trong 1 dự án website fullstack, sẽ có rất nhiều thứ xảy ra. Nhưng phần lớn các dự án sẽ có đi theo một hướng đi cụ thể trong quá trình xây dựng.
- folder routes chú trọng vào chia các routes endpoint dựa theo tính năng của chúng. Đặc điểm là hạn chế code thêm các phần đó, nhiệm vụ của nó chỉ nên dừng lại ở chia nhiệm vụ theo endpoint thôi.
- controller chú trọng vào xử lí logic/ code để đáp ứng yêu cầu từ các routes được chia.
- thông qua các 'request body' gửi từ phía client, ta sẽ truyền dữ liệu từ request (VD: username, email, password, ...)
- status 201 dùng trong POST, khi 1 yêu cầu được xử lí thành công, tạo ra 1 tài nguyên mới.Máy chủ có thể gửi kèm URL của tài nguyên mới trong header Location

- fix thủ công:
tải killport về, xong trong package.json, sửa dev sang "npx kill-port 5050 && nodemon --delay 2 app.js". Mỗi lần sập, nó giết cổng 5050 đi, 2 giây delay mỗi khi server có thay đổi.
- userRouter.get('/:id', authorize, getUser). Func này sẽ thực thi theo thứ tự, từ endpoint /:id, sẽ xử lí authorize. Express tự động truyền req, res, next vào authorize. Nếu authorize gọi next() thì express tiếp tục chạy getUser. Nếu ko, req dừng luôn, ko đến getUser nữa.
- Lưu ý: Tại router, có thể chain bao nhiêu func cũng ok, miễn là nó trong next()


- Khoảng 2 tiếng 40 phút, curl -X POST "http://127.0.0.1:8080/v2/publish/http://localhost:3000" `
>>-H "Authorization: Bearer eyJVc2VySUQiOiJkZWZhdWx0VXNlciIsIlBhc3N3b3JkIjoiZGVmYXVsdFBhc3N3b3JkIn0="
Hãy thay curl thành curl.exe nếu k dùng Linux/MacOS mà dùng Windows.; 
- msg nhận được: {"messageId":"msg_2KxM2bSbeC8Ti6M7rDJRCcMtGqcD3WoH5ohudiVZWxEgvMw5zPTtsFCQdjPoy7L1g5hhMpaR7YUgTkxRfSpiVZRREFRgN"}
