<script setup></script>
<template>
	<footer>
		<div class="mx-auto w-full max-w-screen-xl">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 py-6 lg:py-8">
				<div>
					<h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase">
						About-us
					</h2>
					<p class="text-gray-500 font-medium">E-Store: Your one-stop online destination for all your shopping needs. Discover a curated selection of top-quality products, from electronics and gadgets to fashion essentials and home decor. With seamless navigation and secure transactions, we make shopping online easy and enjoyable. Explore our virtual aisles today and elevate your shopping experience with E-Store.</p>
				</div>
				<div>
					<h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase">
						legal
					</h2>
					<ul class="text-gray-500 font-medium">
						<li class="mb-4 underline">
							<a href="#" class="hover:underline">privacy-policy</a>
						</li>
						<li class="mb-4 underline">
							<a href="#" class="hover:underline">licensing</a>
						</li>
						<li class="mb-4 underline">
							<a href="#" class="hover:underline"> terms-and-conditions</a>
						</li>
					</ul>
				</div>

				<div class="space-y-4" id="contact">
					<div>
						<h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase">
							find-us-on
						</h2>
						<ul class="text-gray-500 font-medium flex flex-wrap gap-x-4">
							<li class="mb-4">
								<NuxtLink
									to="https://www.facebook.com/Merceriezeramdine"
									target="_blank"
									no-rel
									title="facebook"
								>
									<UIcon
										name="i-bxl-facebook-circle"
										class="w-7 h-7 hover:text-blue-700 hover:scale-110 transition-all"
									/>
								</NuxtLink>
							</li>
							<li class="mb-4">
								<a
									href="#"
									title="instagram"
									><UIcon
										name="i-bxl-instagram-alt"
										class="w-7 h-7 hover:text-red-500 hover:scale-110 transition-all"
								/></a>
							</li>
							<li class="mb-4">
								<a
									href="#"
									title="tiktok"
									><UIcon
										name="i-bxl-tiktok"
										class="w-7 h-7 hover:text-black hover:scale-110 transition-all"
								/></a>
							</li>
							<li class="mb-4">
								<a
									href="#"
									title="whatsapp"
									><UIcon
										name="i-bxl-whatsapp"
										class="w-7 h-7 hover:text-green-700 hover:scale-110 transition-all"
								/></a>
							</li>
						</ul>
					</div>

					<UDivider />
					<div>
						<h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase">
							call us
						</h2>
						<p class="text-base font-light rtl:text-end" dir="ltr">
							(+656) 56 000 000
						</p>
					</div>
				</div>
			</div>
			<div class="px-4 py-6 bg-gray-100 flex justify-center" dir="ltr">
				<span class="text-sm text-gray-500 md:text-center"
					>Copyright © 2024 E-store. All Rights Reserved.
				</span>
			</div>
		</div>
	</footer>
</template>