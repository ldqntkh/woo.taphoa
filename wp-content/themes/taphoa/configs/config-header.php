<?php

$config = [
    "version"   =>  0.0001,
    "logoUrl"   => "/wp-content/uploads/2022/07/logo.png",
    "title_seo" => "Ăn vặt MeoMeo - Chuyên cung cấp những mặt hàng ăn vặt chất lượng nhất đến mọi người",
    "payload"   => [
        "page" => 'home',
        "title" => "Ăn vặt MeoMeo - Chuyên cung cấp những mặt hàng ăn vặt chất lượng nhất đến mọi người"
    ],
    "menus"     => [
        [
            "label" => "Mực tẩm",
            "title_seo" => "Mực tẩm ngon chất lượng - Ăn vặt MeoMeo",
            "url"   => "/danh-muc/muc-tam",
            "payload"   => [
                "page" => 'product-archive',
                "title" => "Mực tẩm - Ăn vặt MeoMeo",
                "paged" => 1,
                "category_id" => 16,
                "category_slug" => "muc-tam",
                "total" => 0,
                "cat_url" => "/danh-muc/muc-tam"
            ]
        ],
        [
            "label" => "Mực khô",
            "title_seo" => "Mực khô chất lượng các loại - Ăn vặt MeoMeo",
            "url"   => "/danh-muc/muc-kho",
            "payload"   => [
                "page" => 'product-archive',
                "title" => "Mực khô - Ăn vặt MeoMeo",
                "paged" => 1,
                "category_id" => 17,
                "category_slug" => "muc-kho",
                "total" => 0,
                "cat_url" => "/danh-muc/muc-kho"
            ],
            "subs"  => [
                [
                    "label" => "Mực lá 1 nắng",
                    "title_seo" => "Mực lá 1 nắng Nha Trang - Ăn vặt MeoMeo",
                    "url"   => "/danh-muc/muc-kho/muc-la-mot-nang",
                    "payload"   => [
                        "page" => 'product-archive',
                        "title" => "Mực lá 1 nắng - Ăn vặt MeoMeo",
                        "paged" => 1,
                        "category_id" => 19,
                        "category_slug" => "muc-la-mot-nang",
                        "total" => 0,
                        "cat_url" => "/danh-muc/muc-kho/muc-la-mot-nang"
                    ]
                ],
                [
                    "label" => "Mực ống 1,5 nắng",
                    "title_seo" => "Mực ống 1.5 nắng Nha Trang - Ăn vặt MeoMeo",
                    "url"   => "/danh-muc/muc-kho/muc-ong-mot-nang-ruoi",
                    "payload"   => [
                        "page" => 'product-archive',
                        "title" => "Mực ống 1,5 nắng - Ăn vặt MeoMeo",
                        "paged" => 1,
                        "category_id" => 20,
                        "category_slug" => "muc-ong-mot-nang-ruoi",
                        "total" => 0,
                        "cat_url" => "/danh-muc/muc-kho/muc-ong-mot-nang-ruoi"
                    ]
                ],
                [
                    "label" => "Mực trứng muối",
                    "title_seo" => "Mực trứng muối - Ăn vặt MeoMeo",
                    "url"   => "/danh-muc/muc-kho/muc-trung-muoi",
                    "payload"   => [
                        "page" => 'product-archive',
                        "title" => "Mực trứng muối - Ăn vặt MeoMeo",
                        "paged" => 1,
                        "category_id" => 21,
                        "category_slug" => "muc-trung-muoi",
                        "total" => 0,
                        "cat_url" => "/danh-muc/muc-kho/muc-trung-muoi"
                    ]
                ],
            ]
        ],
        [
            "label" => "Chè dưỡng nhan",
            "title_seo" => "Chè dưỡng nhan nhà nấu - Ăn vặt MeoMeo",
            "url"   => "/danh-muc/che-duong-nhan",
            "payload"   => [
                "page" => 'product-archive',
                "title" => "Chè dưỡng nhan - Ăn vặt MeoMeo",
                "paged" => 1,
                "category_id" => 22,
                "category_slug" => "che-duong-nhan",
                "total" => 0,
                "cat_url" => "/danh-muc/che-duong-nhan"
            ]
        ],
        [
            "label" => "Dầu dừa",
            "title_seo" => "Dầu dừa nguyên chất - Ăn vặt MeoMeo",
            "url"   => "/danh-muc/dau-dua",
            "payload"   => [
                "page" => 'product-archive',
                "title" => "Dầu dừa nguyên chất - Ăn vặt MeoMeo",
                "paged" => 1,
                "category_id" => 23,
                "category_slug" => "dau-dua",
                "total" => 0,
                "cat_url" => "/danh-muc/dau-dua"
            ]
        ],
        [
            "label" => "Mắm tép",
            "title_seo" => "Mắm tép các loại - Ăn vặt MeoMeo",
            "url"   => "/danh-muc/mam-tep",
            "payload"   => [
                "page" => 'product-archive',
                "title" => "Mắm tép các loại - Ăn vặt MeoMeo",
                "paged" => 1,
                "category_id" => 24,
                "category_slug" => "mam-tep",
                "total" => 0,
                "cat_url" => "/danh-muc/mam-tep"
            ]
        ]
    ]
];