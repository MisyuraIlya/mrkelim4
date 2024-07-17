<?php

namespace App\Controller;

use App\helpers\ApiResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CartController extends AbstractController
{
    #[Route('/cartCheck', name: 'app_cart', methods: ['POST'])]
    public function index(Request $request): Response
    {
        try {
            $data = json_decode($request->getContent(), true);
            $this->checkStock($data);
            $this->checkPrice($data);

            $obj = new \stdClass();
            $obj->maam = 17.0;

            return  $this->json((new ApiResponse($obj,''))->OnSuccess());
        } catch (\Exception $e) {
            return $this->json((new ApiResponse(null,$e->getMessage()))->OnError());
        }
    }

    private function checkStock($data)
    {

    }

    private function checkPrice($data)
    {

    }


}
