$(function(){

    
    var header = `
    <!--상단띠배너-->
	<div class="top_bn_w">

		<div class="top_bn">
			<div class="inner">
				<ul>
					<li>
						<a href="#">
							<p>[일반공지]2019 캐릭터라이센싱페어 사전등록하고 아메리카노 한잔 아메리카노 한잔!!!</p>
						</a>
					</li>
					<li>
						<a href="#">
							<p>[일반공지]2019 캐릭터라이센싱페어 사전등록하고 아메리카노 한잔!!! </p>
						</a>
					</li>
				</ul>
				<button type="button" class="top_bn_close" data-target="top_bn_w">닫기</button>
			</div>
		</div>

	</div>
	<!--//상단띠배너-->

	<!--해더-->
	<header id="header">

		<div class="inner">
			
			<div class="logo_wrap">
				<a href="#">
					<img src="../images/icon/pc_header_logo.png" alt="logo"/>
				</a>
			</div>

			<div class="gnb_wrap">

				<!--초대권등록-->
				<div class="ticket_w">
					<a href="#">
						<span>초대권 등록</span>
					</a>
				</div>
				<!--//초대권등록-->

				<!--로그인,아웃-->
				<div class="log_wrap">
					<!--로그아웃 시
					<ul class="link">
						<li><a href="#">로그인</a></li>
						<li><a href="#">회원가입</a></li>
					</ul>
					//로그아웃 시-->

					<!--로그인 시-->
					<ul class="link">
						<li class="pc"><a href="#">로그아웃</a></li>
					</ul>
					<div class="mypage_bt_w toggle_btn" data-target="mypage_bt_list" data-sort="normal">
						<div class="mypage_bt_in">
							<a href="javascript:void(0)" class="mypage_bt toggle_btn">
								<div class="icon_wrap">
									<div class="img">
										<img src="../images/icon/m_default_sum2.png" alt="">
									</div>
									<b>99</b>
								</div>
							</a>
							<div class="mypage_bt_list">
								<strong>마이페이지</strong>
								<ul>
									<li>
										<a href="">회원정보 관리</a>
									</li>
									<li>
										<a href="">나의 사전등록 관리</a>
									</li>
									<li>
										<a href="">이벤트함</a>
									</li>
									<li>
										<a href="">초대권 등록</a>
									</li>
									<li>
										<a href="">전시관리 플랫폼</a>
									</li>
									<li>
										<a href="">알림함</a>
									</li>
									<li class="mo"><a href="#">로그아웃</a></li>
								</ul>
							</div>
						</div>
						<div class="users">홍길동님</div>
					</div>
					
					<!--//로그인 시-->
				</div>
				<!--//로그인,아웃-->

				<!--검색버튼-->
				<div class="search_bt_w">
					<button type="button" class="panel_s_btn" data-target="panel_s_w" data-sort="none" data-on="true">검색열기</button>
				</div>
				<!--//검색버튼-->

				<!--패널 열기 버튼-->
				<div class="panel_bt_w">
					<button type="button" class="panel_btn" data-target="panel_w" data-sort="none" data-on="true">
						<span class="barTop"></span>
						<span class="barMid"></span>
						<span class="barBot"></span>
					</button>
				</div>
				<!--//패널 열기 버튼-->
				
			</div>

		</div>

	</header>
	<!--//해더-->

	<!--사이트맵 패널-->
	<div class="panel_w">
		<div class="panel_in">
			<div class="panel_list">

				<div class="site_m">

					<div class="site_list">
						<ul>
							<li>
								<strong><a href="">전시회</a></strong>
								<!--
								<ul class="depth">
									<li>
										<a href="#">유료</a>
									</li>
									<li>
										<a href="#">무료</a>
									</li>
								</ul>-->
							</li>
							<li>
								<strong><a href="">부대행사</a></strong>
								<!--
								<ul class="depth">
									<li>
										<a href="#">유료</a>
									</li>
									<li>
										<a href="#">무료</a>
									</li>
								</ul>-->
							</li>
							<li>
								<strong><a href="">지난 전시회 Archive</a></strong>
							</li>
							<li>
								<strong><a href="">이벤트</a></strong>
							</li>
							<li class="depth_w">
								<strong><a href="">고객센터</a></strong>
								
								<ul class="depth">
									<li>
										<a href="#">사전등록 이용안내</a>
									</li>
									<li>
										<a href="#">자주묻는 질문</a>
									</li>
									<li>
										<a href="#">공지사항</a>
									</li>
								</ul>
							</li>
						</ul>
					</div>

					<div class="panel_link">
						<a href="#">코엑스 행사일정 바로가기</a>
					</div>

				</div>

			</div>
		</div>
	</div>
	<!--//사이트맵 패널-->

	<!--검색 패널-->
	<div class="panel_s_w">
		<div class="panel_in">
			<div class="panel_list">

				<div class="search_m">
					<button type="button" class="panel_s_close" data-target="panel_s_w" data-sort="none" data-on="true">검색닫기</button>			

					<div class="search_input_w">
						<div class="search_input">
							<input type="text" placeholder="검색어를 입력해 주세요">
							<button type="button">검색</button>
						</div>
					</div>

					<div class="search_input_list">
						<h3>인기검색어</h3>
						<ul>
							<li><a href="#">#커피</a></li>
							<li><a href="#">#디자인</a></li>
							<li><a href="#">#IT</a></li>
							<li><a href="#">#베이비엑스포</a></li>
							<li><a href="#">#캐릭터라이선싱</a></li>
						</ul>
					</div>

				</div>

			</div>
		</div>
	</div>
	<!--//검색 패널-->

    `;

    var footer = `
    <!--후터-->
	<footer id="footer" class="footer">

		<div class="inner">

			<div class="logo_wrap">
				<img src="../images/icon/pc_footer_logo.png" alt="로고"/>
			</div>

			<div class="sns_wrap">
				<ul class="clear_both">
					<li class="twitter">
						<a href="#">트위터</a>
					</li>
					<li class="instagram">
						<a href="#">인스타그램</a>
					</li>
					<li class="facebook">
						<a href="#">페이스북</a>
					</li>
					<li class="blog">
						<a href="#">블로그</a>
					</li>
				</ul>
			</div>

			<!--
			<div class="footer_btn">
				<a href="#">전시관리 플랫폼 바로가기</a>
			</div>-->

			<div class="family_wrap">
				<div class="family_in">
					<ul class="clear_both family_target">
						<li>
							<a href="#">창원컨벤션센터</a>
						</li>
						<li>
							<a href="#">CoexMall</a>
						</li>
						<li>
							<a href="#">KITA</a>
						</li>
						<li>
							<a href="#">WTC Seoul</a>
						</li>
						<li>
							<a href="#">KTNET</a>
						</li>
						<li>
							<a href="#">CALT</a>
						</li>
						<li>
							<a href="#">CAAM</a>
						</li>
					</ul>
					<div class="family_btn toggle_btn" data-target="family_target" data-on="true">Family Site</div>
				</div>
			</div>

			<div class="link_wrap">
				<ul class="clear_both">
					<li>
						<a href="#">개인정보처리방침</a>
					</li>
					<li>
						<a href="#">이메일무단수집거부</a>
					</li>
					<li>
						<a href="#">취소및환불정책</a>
					</li>
					<!--
					<li class="pc">
						<a href="#">전시관리 플랫폼</a>
					</li>-->
				</ul>
			</div>

			<div class="copyright_wrap">
				<ul class="clear_both">
					<li>서울특별시 강남구 영동대로 513 (삼성동, 코엑스) 06164</li>
					<li>문의전화 : 02-6000-0114</li>
					<li>COPYRIGHT 2015-2019 © COEX</li>
					<li>ALL RIGHTS RESERVED.</li>
				</ul>
			</div>

		</div>

		<div class="btnTop">
			<a href="#">
				탑으로
			</a>
		</div>

	</footer>
	<!--//후터-->

    `

    $("#header").html(header);
    $("#header #header").unwrap();

    $("#footer").html(footer);
    $("#footer #footer").unwrap();

});